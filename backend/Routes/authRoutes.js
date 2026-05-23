const express = require('express');
const router = express.Router();
const { 
  register, login, getProfile, getAllUsers, 
  updateUser, deleteUser, createWalkInGuest,
  updateOwnProfile  // ✅ naya add karo
} = require('../Controllers/authController');
const { protect, adminOnly } = require('../Middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

// ✅ User apna profile update kare — sirf protect (no adminOnly)
router.put('/profile/update', protect, updateOwnProfile);

// Users management — Admin only
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/users/:id', protect, adminOnly, updateUser);
router.delete('/users/:id', protect, adminOnly, deleteUser);

// Walk-in guest
router.post('/walkin-guest', protect, adminOnly, createWalkInGuest);
module.exports = router;