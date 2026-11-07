import express from 'express';
import Service from '../models/Service.js';
import Car from '../models/Car.js';
import Customer from '../models/Customer.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// GET /api/services/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const activeServices = await Service.countDocuments({
      status: { $in: ['Pending', 'In Service'] },
    });
    const completedServices = await Service.countDocuments({
      status: { $in: ['Completed', 'Delivered'] },
    });

    // Recent 5 services
    const recentServices = await Service.find()
      .populate('carId', 'carName model registrationNumber currentKm')
      .populate('customerId', 'name phone')
      .sort({ serviceDate: -1, createdAt: -1 })
      .limit(6);

    // Cars currently in service (Active)
    const inServiceList = await Service.find({
      status: { $in: ['Pending', 'In Service'] },
    })
      .populate('carId', 'carName model registrationNumber currentKm chassisNumber')
      .populate('customerId', 'name phone address')
      .sort({ serviceDate: -1, createdAt: -1 });

    res.json({
      stats: {
        totalCars,
        totalCustomers,
        activeServices,
        completedServices,
      },
      recentServices,
      inServiceList,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error retrieving dashboard statistics' });
  }
});

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const { search, status, carId } = req.query;
    let filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (carId) {
      filter.carId = carId;
    }

    let services = await Service.find(filter)
      .populate('carId', 'carName model registrationNumber currentKm')
      .populate('customerId', 'name phone')
      .sort({ serviceDate: -1, createdAt: -1 });

    if (search) {
      const q = search.toLowerCase().trim();
      services = services.filter((s) => {
        const carMatch =
          s.carId?.carName?.toLowerCase().includes(q) ||
          s.carId?.registrationNumber?.toLowerCase().includes(q) ||
          s.carId?.model?.toLowerCase().includes(q);
        const custMatch =
          s.customerId?.name?.toLowerCase().includes(q) ||
          s.customerId?.phone?.toLowerCase().includes(q);
        const codeMatch = s.serviceCode?.toLowerCase().includes(q);
        const typeMatch = s.serviceType?.toLowerCase().includes(q);
        return carMatch || custMatch || codeMatch || typeMatch;
      });
    }

    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Error retrieving services' });
  }
});

// GET /api/services/:id
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('carId')
      .populate('customerId');

    if (!service) {
      return res.status(404).json({ message: 'Service record not found' });
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Error retrieving service details' });
  }
});

// POST /api/services
router.post('/', async (req, res) => {
  try {
    const {
      carId,
      customerId,
      serviceDate,
      serviceType,
      currentKm,
      status,
      expectedDeliveryDate,
      workDescription,
      parts,
      labourCost,
      partsCost,
      totalCost,
      notes,
    } = req.body;

    if (!carId) {
      return res.status(400).json({ message: 'Car selection is required' });
    }

    // Verify car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Selected car not found' });
    }

    const finalCustomerId = customerId || car.customerId;
    const finalLabour = Number(labourCost) || 0;
    const finalPartsCost = Number(partsCost) || 0;
    const computedTotal =
      totalCost !== undefined && totalCost !== null && totalCost !== ''
        ? Number(totalCost)
        : finalLabour + finalPartsCost;

    const km = Number(currentKm) || car.currentKm || 0;

    const service = new Service({
      carId,
      customerId: finalCustomerId,
      serviceDate: serviceDate || new Date(),
      serviceType: serviceType || 'General Service',
      currentKm: km,
      status: status || 'Pending',
      expectedDeliveryDate: expectedDeliveryDate || null,
      workDescription: workDescription ? workDescription.trim() : '',
      parts: parts ? parts.trim() : '',
      labourCost: finalLabour,
      partsCost: finalPartsCost,
      totalCost: computedTotal,
      notes: notes ? notes.trim() : '',
    });

    const saved = await service.save();

    // Update car's currentKm if the service KM is higher
    if (km > car.currentKm) {
      car.currentKm = km;
      await car.save();
    }

    const populated = await Service.findById(saved._id)
      .populate('carId')
      .populate('customerId');

    res.status(201).json(populated);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: error.message || 'Error creating service record' });
  }
});

// PUT /api/services/:id
router.put('/:id', async (req, res) => {
  try {
    const {
      serviceDate,
      serviceType,
      currentKm,
      status,
      expectedDeliveryDate,
      workDescription,
      parts,
      labourCost,
      partsCost,
      totalCost,
      notes,
    } = req.body;

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (serviceDate) service.serviceDate = serviceDate;
    if (serviceType) service.serviceType = serviceType;
    if (currentKm !== undefined) service.currentKm = Number(currentKm) || 0;
    if (status) service.status = status;
    if (expectedDeliveryDate !== undefined)
      service.expectedDeliveryDate = expectedDeliveryDate || null;
    if (workDescription !== undefined) service.workDescription = workDescription.trim();
    if (parts !== undefined) service.parts = parts.trim();
    if (labourCost !== undefined) service.labourCost = Number(labourCost) || 0;
    if (partsCost !== undefined) service.partsCost = Number(partsCost) || 0;

    if (totalCost !== undefined && totalCost !== null && totalCost !== '') {
      service.totalCost = Number(totalCost);
    } else {
      service.totalCost = service.labourCost + service.partsCost;
    }

    if (notes !== undefined) service.notes = notes.trim();

    const updated = await service.save();

    // Update car KM if updated currentKm is higher
    if (service.currentKm) {
      const car = await Car.findById(service.carId);
      if (car && service.currentKm > car.currentKm) {
        car.currentKm = service.currentKm;
        await car.save();
      }
    }

    const populated = await Service.findById(updated._id)
      .populate('carId')
      .populate('customerId');

    res.json(populated);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: error.message || 'Error updating service' });
  }
});

// DELETE /api/services/:id
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service record deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: error.message || 'Error deleting service' });
  }
});

export default router;
