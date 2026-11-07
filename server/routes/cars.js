import express from 'express';
import Car from '../models/Car.js';
import Customer from '../models/Customer.js';
import Service from '../models/Service.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// ==========================================
// PUBLIC ENDPOINT - No authentication required
// Used by car frontend customer tracker
// GET /api/cars/public/status/:registrationNumber
// ==========================================
router.get('/public/status/:registrationNumber', async (req, res) => {
  try {
    const rawReg = req.params.registrationNumber;
    if (!rawReg || !rawReg.trim()) {
      return res.status(400).json({ message: 'Registration number is required' });
    }

    const cleanReg = rawReg.trim().toUpperCase();
    // Match with flexible spacing e.g. "KL 65 4037" vs "KL654037" vs "KL-65-4037"
    const alphaNum = cleanReg.replace(/[^A-Z0-9]/gi, '');
    const flexiblePattern = alphaNum.split('').join('\\s*[-/]?\\s*');
    const searchRegex = new RegExp('^\\s*[-/]?\\s*' + flexiblePattern + '\\s*[-/]?\\s*$', 'i');

    const car = await Car.findOne({ registrationNumber: { $regex: searchRegex } })
      .populate('customerId', 'name phone');

    if (!car) {
      return res.status(404).json({
        message: `No vehicle found for "${cleanReg}". Please verify your registration number or contact our hub directly.`,
      });
    }

    // Get all services sorted newest first
    const services = await Service.find({ carId: car._id })
      .sort({ serviceDate: -1, createdAt: -1 });

    const activeService = services.find((s) =>
      ['Pending', 'In Service'].includes(s.status)
    );

    let currentStatus = 'Ready';
    if (activeService) {
      currentStatus = activeService.status;
    } else if (services.length > 0) {
      currentStatus = services[0].status;
    }

    // Privacy mask for phone
    const maskPhone = (ph) => {
      if (!ph) return '';
      const str = String(ph).trim();
      if (str.length <= 4) return str;
      return str.slice(0, 3) + ' •••• ' + str.slice(-4);
    };

    return res.json({
      success: true,
      car: {
        id: car._id,
        carName: car.carName,
        model: car.model,
        registrationNumber: car.registrationNumber,
        chassisNumber: car.chassisNumber || 'OEM Verified',
        currentKm: car.currentKm,
        customerName: car.customerId?.name || 'Valued Client',
        phoneMasked: maskPhone(car.phone || car.customerId?.phone),
      },
      currentStatus,
      activeService: activeService
        ? {
            serviceCode: activeService.serviceCode,
            serviceType: activeService.serviceType,
            status: activeService.status,
            currentKm: activeService.currentKm,
            serviceDate: activeService.serviceDate,
            expectedDeliveryDate: activeService.expectedDeliveryDate,
            workDescription: activeService.workDescription,
            parts: activeService.parts,
          }
        : null,
      serviceHistory: services.map((s) => ({
        id: s._id,
        serviceCode: s.serviceCode,
        serviceDate: s.serviceDate,
        serviceType: s.serviceType,
        status: s.status,
        currentKm: s.currentKm,
        expectedDeliveryDate: s.expectedDeliveryDate,
        workDescription: s.workDescription,
        parts: s.parts,
        totalCost: s.totalCost || 0,
      })),
      totalServices: services.length,
    });
  } catch (error) {
    console.error('Error fetching public car status:', error);
    return res.status(500).json({ message: 'Error retrieving vehicle information' });
  }
});

// All routes below this require authentication
router.use(protect);

// GET /api/cars
router.get('/', async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    const cars = await Car.find(query)
      .populate('customerId')
      .sort({ updatedAt: -1 });

    // Compute last service and active status for each car
    let enrichedCars = await Promise.all(
      cars.map(async (car) => {
        const carObj = car.toObject();
        // Find latest service
        const latestService = await Service.findOne({ carId: car._id }).sort({
          serviceDate: -1,
          createdAt: -1,
        });

        // Find active in-progress service if any
        const activeService = await Service.findOne({
          carId: car._id,
          status: { $in: ['Pending', 'In Service'] },
        }).sort({ createdAt: -1 });

        // Total services count
        const serviceCount = await Service.countDocuments({ carId: car._id });

        let currentStatus = 'Ready';
        if (activeService) {
          currentStatus = activeService.status; // 'Pending' or 'In Service'
        } else if (latestService) {
          currentStatus = latestService.status; // 'Completed' or 'Delivered'
        }

        return {
          ...carObj,
          lastService: latestService ? latestService.serviceDate : null,
          latestServiceType: latestService ? latestService.serviceType : null,
          currentStatus,
          activeServiceId: activeService ? activeService._id : null,
          serviceCount,
        };
      })
    );

    // Apply client filter/search if provided
    if (search) {
      const q = search.toLowerCase().trim();
      enrichedCars = enrichedCars.filter((c) => {
        const regMatch = c.registrationNumber?.toLowerCase().includes(q);
        const nameMatch = c.carName?.toLowerCase().includes(q);
        const modelMatch = c.model?.toLowerCase().includes(q);
        const custMatch = c.customerId?.name?.toLowerCase().includes(q);
        const phoneMatch =
          c.phone?.toLowerCase().includes(q) ||
          c.customerId?.phone?.toLowerCase().includes(q);
        return regMatch || nameMatch || modelMatch || custMatch || phoneMatch;
      });
    }

    if (status && status !== 'all') {
      enrichedCars = enrichedCars.filter(
        (c) => c.currentStatus?.toLowerCase() === status.toLowerCase()
      );
    }

    res.json(enrichedCars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    res.status(500).json({ message: 'Error retrieving cars list' });
  }
});

// GET /api/cars/:id (Car Details + full service history)
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('customerId');
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Get all services for this car sorted newest first
    const services = await Service.find({ carId: car._id })
      .populate('customerId', 'name phone')
      .sort({ serviceDate: -1, createdAt: -1 });

    // Find active service
    const activeService = services.find((s) =>
      ['Pending', 'In Service'].includes(s.status)
    );

    const currentStatus = activeService
      ? activeService.status
      : services.length > 0
      ? services[0].status
      : 'Ready';

    res.json({
      ...car.toObject(),
      services,
      currentStatus,
      totalServices: services.length,
      totalSpent: services.reduce((acc, s) => acc + (s.totalCost || 0), 0),
    });
  } catch (error) {
    console.error('Error fetching car details:', error);
    res.status(500).json({ message: 'Error retrieving car details' });
  }
});

// POST /api/cars
router.post('/', async (req, res) => {
  try {
    const {
      customerId,
      // Inline customer creation if new
      newCustomerName,
      newCustomerPhone,
      newCustomerAddress,
      carName,
      model,
      registrationNumber,
      chassisNumber,
      currentKm,
      phone,
    } = req.body;

    if (!carName || !model || !registrationNumber) {
      return res.status(400).json({
        message: 'Car brand, model, and registration number are required',
      });
    }

    const regUpper = registrationNumber.trim().toUpperCase();

    // Check duplicate registration
    const existing = await Car.findOne({ registrationNumber: regUpper });
    if (existing) {
      return res.status(400).json({
        message: `A vehicle with registration ${regUpper} already exists`,
      });
    }

    let finalCustomerId = customerId;

    // If new customer details provided
    if (!finalCustomerId) {
      if (!newCustomerName || !newCustomerPhone) {
        return res.status(400).json({
          message: 'Please select an existing customer or provide customer name and phone',
        });
      }

      // Check if existing customer with same phone exists or create new
      let customer = await Customer.findOne({ phone: newCustomerPhone.trim() });
      if (!customer) {
        customer = new Customer({
          name: newCustomerName.trim(),
          phone: newCustomerPhone.trim(),
          address: newCustomerAddress ? newCustomerAddress.trim() : '',
        });
        await customer.save();
      }
      finalCustomerId = customer._id;
    }

    const car = new Car({
      customerId: finalCustomerId,
      carName: carName.trim(),
      model: model.trim(),
      registrationNumber: regUpper,
      chassisNumber: chassisNumber ? chassisNumber.trim() : '',
      currentKm: Number(currentKm) || 0,
      phone: phone ? phone.trim() : '',
    });

    const saved = await car.save();
    const populated = await Car.findById(saved._id).populate('customerId');

    res.status(201).json(populated);
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: error.message || 'Error creating car' });
  }
});

// PUT /api/cars/:id
router.put('/:id', async (req, res) => {
  try {
    const {
      carName,
      model,
      registrationNumber,
      chassisNumber,
      currentKm,
      phone,
      customerId,
    } = req.body;

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (registrationNumber) {
      const regUpper = registrationNumber.trim().toUpperCase();
      if (regUpper !== car.registrationNumber) {
        const existing = await Car.findOne({ registrationNumber: regUpper });
        if (existing && existing._id.toString() !== car._id.toString()) {
          return res.status(400).json({
            message: `A vehicle with registration ${regUpper} already exists`,
          });
        }
        car.registrationNumber = regUpper;
      }
    }

    if (carName) car.carName = carName.trim();
    if (model) car.model = model.trim();
    if (chassisNumber !== undefined) car.chassisNumber = chassisNumber.trim();
    if (currentKm !== undefined) car.currentKm = Number(currentKm) || 0;
    if (phone !== undefined) car.phone = phone.trim();
    if (customerId) car.customerId = customerId;

    const updated = await car.save();
    const populated = await Car.findById(updated._id).populate('customerId');
    res.json(populated);
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: error.message || 'Error updating car' });
  }
});

// DELETE /api/cars/:id
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await Service.deleteMany({ carId: car._id });
    await Car.findByIdAndDelete(req.params.id);

    res.json({ message: 'Car and associated service history deleted' });
  } catch (error) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: error.message || 'Error deleting car' });
  }
});

export default router;
