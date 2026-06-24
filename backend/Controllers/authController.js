const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auditLog = require('../Services/auditLogService');

// ============================================================
// HELPER — generate JWT token
// ============================================================
const generateAccessToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
};

const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

// ============================================================
// REGISTER
// ============================================================
const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters.' });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ success: false, message: 'Email already registered. Please login instead.' });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ success: false, message: 'Phone number already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // 12 rounds (more secure than 10)

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      password: hashedPassword,
      role: role || 'guest',
    });

    await auditLog.log(req, {
      action: 'USER_REGISTER',
      targetModel: 'User',
      targetId: user._id,
      description: `New user registered: ${user.name} (${user.role})`,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// LOGIN
// ============================================================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Log failed attempt
      await auditLog.log(req, {
        action: 'LOGIN_FAILED',
        description: `Failed login attempt for email: ${email}`,
        severity: 'warning',
      });
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Your account has been suspended. Contact admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      await auditLog.log(req, {
        action: 'LOGIN_FAILED',
        description: `Failed login attempt for user: ${user.name}`,
        severity: 'warning',
        metadata: { userId: user._id },
      });
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const accessToken = generateAccessToken(user._id, user.role);
const refreshToken = generateRefreshToken(user._id);
await User.findByIdAndUpdate(user._id, { refreshToken });

    await auditLog.log(req, {
      action: 'USER_LOGIN',
      targetModel: 'User',
      targetId: user._id,
      description: `${user.name} (${user.role}) logged in`,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
     token: accessToken,
refreshToken,
user: {
        _id: user._id,
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// GET PROFILE
// ============================================================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// UPDATE OWN PROFILE
// ============================================================
const updateOwnProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name: name.trim(), phone: phone || '' },
      { new: true }
    ).select('-password');

    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    await auditLog.log(req, {
      action: 'USER_UPDATED',
      targetModel: 'User',
      targetId: user._id,
      description: `${user.name} updated their own profile`,
    });

    res.status(200).json({ success: true, message: 'Profile updated.', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// CHANGE PASSWORD
// ============================================================
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password required.' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: 'New password must be at least 8 characters.' });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({ success: false, message: 'New password must be different from current password.' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    await auditLog.log(req, {
      action: 'PASSWORD_CHANGED',
      targetModel: 'User',
      targetId: user._id,
      description: `${user.name} changed their password`,
      severity: 'warning',
    });

    res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// GET ALL USERS (Admin)
// ============================================================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate('bookings')
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// UPDATE USER (Admin)
// ============================================================
const updateUser = async (req, res) => {
  try {
    const { name, phone, role, address, status } = req.body;

    const oldUser = await User.findById(req.params.id);
    if (!oldUser) return res.status(404).json({ success: false, message: 'User not found.' });

    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (role) updates.role = role;
    if (address !== undefined) updates.address = address;
    if (status !== undefined) updates.status = status;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');

    const actionType = status === 'suspended' ? 'USER_SUSPENDED' : 'USER_UPDATED';
    await auditLog.log(req, {
      action: actionType,
      targetModel: 'User',
      targetId: user._id,
      description: `Admin updated user: ${user.name}`,
      severity: status === 'suspended' ? 'critical' : 'info',
      metadata: { changes: updates, previousStatus: oldUser.status },
    });

    res.status(200).json({ success: true, message: 'User updated.', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// DELETE USER (Admin)
// ============================================================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    await auditLog.log(req, {
      action: 'USER_DELETED',
      targetModel: 'User',
      targetId: req.params.id,
      description: `Admin deleted user: ${user.name} (${user.email})`,
      severity: 'critical',
      metadata: { deletedUser: { name: user.name, email: user.email, role: user.role } },
    });

    res.status(200).json({ success: true, message: 'User deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ============================================================
// CREATE WALK-IN GUEST (Admin)
// ============================================================
const createWalkInGuest = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required.' });
    }

    const walkinEmail = email || `walkin_${Date.now()}@walkin.hotel`;
    const hashedPassword = await bcrypt.hash('walkin_' + Date.now(), 12);

    const user = await User.create({
      name,
      email: walkinEmail,
      phone,
      password: hashedPassword,
      role: 'guest',
      guestType: 'walk-in',
    });

    await auditLog.log(req, {
      action: 'USER_CREATED',
      targetModel: 'User',
      targetId: user._id,
      description: `Walk-in guest created: ${user.name}`,
      metadata: { guestType: 'walk-in' },
    });

    res.status(201).json({ success: true, message: 'Walk-in guest created.', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ success: false, message: 'Refresh token required.' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ success: false, message: 'Invalid refresh token.' });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({ success: false, message: 'Account suspended.' });
    }

    const newAccessToken = generateAccessToken(user._id, user.role);

    res.status(200).json({ success: true, token: newAccessToken });
  } catch (err) {
    res.status(403).json({ success: false, message: 'Refresh token expired. Please login again.' });
  }
};

const logout = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    await auditLog.log(req, {
      action: 'USER_LOGOUT',
      targetModel: 'User',
      targetId: req.user._id,
      description: `${req.user.name} logged out`,
    });
    res.status(200).json({ success: true, message: 'Logged out successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
module.exports = {
  register, login, refreshAccessToken, logout,
  getProfile, updateOwnProfile, changePassword,
  getAllUsers, updateUser, deleteUser, createWalkInGuest,
};
