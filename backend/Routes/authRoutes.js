const express = require('express');
const router = express.Router();
const { 
  register, login, getProfile, getAllUsers, 
  updateUser, deleteUser, createWalkInGuest,
  updateOwnProfile, changePassword, refreshAccessToken, logout
} = require('../Controllers/authController');
const { protect, adminOnly } = require('../Middleware/authMiddleware');
const { ..., refreshAccessToken, logout } = require('../Controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

// ✅ User apna profile update kare — sirf protect (no adminOnly)
router.put('/profile/update', protect, updateOwnProfile);

// ✅ User apna password change kare
router.put('/profile/change-password', protect, changePassword);

// Users management — Admin only
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/users/:id', protect, adminOnly, updateUser);
router.delete('/users/:id', protect, adminOnly, deleteUser);


// Walk-in guest
router.post('/walkin-guest', protect, adminOnly, createWalkInGuest);
router.post('/refresh-token', refreshAccessToken);
router.post('/logout', protect, logout);
module.exports = router;