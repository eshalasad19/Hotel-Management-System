const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'guest'
    });

    res.status(201).json({ message: 'User registered successfully', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Users (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('bookings').select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update User (Admin)
const updateUser = async (req, res) => {
  try {
    const { name, phone, role, address, status } = req.body;
    const updates = { name, phone, role };
    if (address !== undefined) updates.address = address;
    if (status !== undefined) updates.status = status;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete User (Admin)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// FIX 3: Walk-in Guest Create (Admin panel se)
// Ye function admin jab naya booking banata hai tab ek temporary user banata hai
// Walk-in guest create — admin panel se booking hone par
// guestType: 'walk-in' set hota hai taake users page mein "Walk-in" badge show ho
const createWalkInGuest = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    // Har walk-in guest ka unique internal email banao
    // Real email ignore karo — guestType se identify karenge ab
    const walkinEmail = `walkin_${Date.now()}_${Math.floor(Math.random()*1000)}@walkin.hotel`;

    const hashedPassword = await bcrypt.hash('walkin123', 10);

    const user = await User.create({
      name,
      email: walkinEmail,
      phone,
      password: hashedPassword,
      role: 'guest',
      guestType: 'walk-in'   // KEY FIX: yahi field users page mein Walk-in dikhayega
    });

    res.status(201).json({ message: 'Walk-in guest created', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { register, login, getProfile, getAllUsers, updateUser, deleteUser, createWalkInGuest };