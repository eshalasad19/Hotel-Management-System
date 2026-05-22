const express = require('express');
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  checkInBooking,
  checkOutBooking,
  completeBooking,
  updatePaymentStatus,
} = require('../Controllers/bookingController');

const {
  protect,
  adminOnly,
  staffRoles
} = require('../Middleware/authMiddleware');


// Create Booking
router.post('/', protect, createBooking);

// User Bookings
router.get('/my', protect, getMyBookings);

// All Bookings
router.get(
  '/all',
  protect,
  staffRoles('admin', 'manager', 'receptionist'),
  getAllBookings
);

// Old Generic Update
router.put(
  '/:id',
  protect,
  staffRoles('admin', 'manager', 'receptionist'),
  updateBookingStatus
);

// Check-In
router.put(
  '/:id/check-in',
  protect,
  staffRoles('admin', 'manager', 'receptionist'),
  checkInBooking
);

// Check-Out
router.put(
  '/:id/check-out',
  protect,
  staffRoles('admin', 'manager', 'receptionist'),
  checkOutBooking
);
router.put(
  "/:id/payment",
  protect,
  adminOnly,
  updatePaymentStatus
);

// Complete Booking
router.put(
  '/:id/complete',
  protect,
  staffRoles('admin', 'manager', 'receptionist'),
  completeBooking
);

module.exports = router;