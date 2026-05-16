const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const { protect, adminOnly, staffRoles } = require('../middleware/authMiddleware');
router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/all', protect, staffRoles('admin', 'manager', 'receptionist'), getAllBookings);
router.put('/:id', protect, staffRoles('admin', 'manager', 'receptionist'), updateBookingStatus);

module.exports = router;