const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ========================
// REGISTER
// ========================
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

// ========================
// LOGIN
// ========================
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
        _id: user._id,   // ✅ _id add kiya (pehle sirf id tha)
        id: user._id,    // ✅ dono bhejo compatibility ke liye
        name: user.name,
        email: user.email,
        phone: user.phone || "",  // ✅ phone bhi bhejo
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// GET PROFILE (token se)
// ========================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// ✅ UPDATE OWN PROFILE (user apna update kare)
// ========================
const updateOwnProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ message: 'Naam required hai' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,  // token se aata hai — safe hai
      { name: name.trim(), phone: phone || "" },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// GET ALL USERS (Admin)
// ========================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('bookings')
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// UPDATE USER (Admin)
// ========================
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

// ========================
// DELETE USER (Admin)
// ========================
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

// ========================
// CREATE WALK-IN GUEST (Admin)
// ========================
const createWalkInGuest = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone are required' });
    }

    const walkinEmail = `walkin_${Date.now()}_${Math.floor(Math.random() * 1000)}@walkin.hotel`;

    const hashedPassword = await bcrypt.hash('walkin123', 10);

    const user = await User.create({
      name,
      email: walkinEmail,
      phone,
      password: hashedPassword,
      role: 'guest',
      guestType: 'walk-in'
    });

    res.status(201).json({ message: 'Walk-in guest created', user });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// EXPORTS
// ========================
module.exports = {
  register,
  login,
  getProfile,
  updateOwnProfile,  // ✅ naya
  getAllUsers,
  updateUser,
  deleteUser,
  createWalkInGuest
};