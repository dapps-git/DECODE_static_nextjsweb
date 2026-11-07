import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: role || 'Admin',
    });

    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: error.message || 'Error creating user' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name.trim();
    if (email) {
      const emailLower = email.toLowerCase().trim();
      if (emailLower !== user.email) {
        const existing = await User.findOne({ email: emailLower });
        if (existing && existing._id.toString() !== user._id.toString()) {
          return res.status(400).json({ message: 'Email already taken by another user' });
        }
        user.email = emailLower;
      }
    }
    if (role) user.role = role;
    if (password && password.trim() !== '') {
      user.password = password; // pre-save hook will hash it
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message || 'Error updating user' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    if (totalUsers <= 1) {
      return res.status(400).json({ message: 'Cannot delete the only remaining user' });
    }

    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ message: 'You cannot delete your own active account' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message || 'Error deleting user' });
  }
});

export default router;
