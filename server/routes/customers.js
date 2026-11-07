import express from 'express';
import Customer from '../models/Customer.js';
import Car from '../models/Car.js';
import Service from '../models/Service.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// GET /api/customers
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });

    // Attach car count to each customer
    const customersWithCars = await Promise.all(
      customers.map(async (cust) => {
        const carCount = await Car.countDocuments({ customerId: cust._id });
        const cars = await Car.find({ customerId: cust._id }).select('carName registrationNumber');
        return {
          ...cust.toObject(),
          carCount,
          cars,
        };
      })
    );

    res.json(customersWithCars);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Error retrieving customers' });
  }
});

// POST /api/customers
router.post('/', async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ message: 'Customer name and phone are required' });
    }

    const customer = new Customer({
      name: name.trim(),
      phone: phone.trim(),
      address: address ? address.trim() : '',
    });

    const saved = await customer.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ message: error.message || 'Error creating customer' });
  }
});

// PUT /api/customers/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    if (name) customer.name = name.trim();
    if (phone) customer.phone = phone.trim();
    if (address !== undefined) customer.address = address.trim();

    const updated = await customer.save();
    res.json(updated);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ message: error.message || 'Error updating customer' });
  }
});

// DELETE /api/customers/:id
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Cascade delete cars and services associated
    const cars = await Car.find({ customerId: customer._id });
    const carIds = cars.map((c) => c._id);

    await Service.deleteMany({ carId: { $in: carIds } });
    await Car.deleteMany({ customerId: customer._id });
    await Customer.findByIdAndDelete(req.params.id);

    res.json({ message: 'Customer and associated vehicles/services deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: error.message || 'Error deleting customer' });
  }
});

export default router;
