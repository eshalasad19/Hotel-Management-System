const express = require('express');
const router = express.Router();
const { register, login, getProfile, getAllUsers, updateUser, deleteUser, createWalkInGuest } = require('../Controllers/authController');
const { protect, adminOnly } = require('../Middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);

// Users management — Admin only
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/users/:id', protect, adminOnly, updateUser);
router.delete('/users/:id', protect, adminOnly, deleteUser);

// FIX 3: Walk-in guest create route
router.post('/walkin-guest', protect, adminOnly, createWalkInGuest);

module.exports = router;