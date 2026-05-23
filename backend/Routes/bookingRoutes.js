const express = require('express');
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBookingsByUserId,  // ✅ naya add kiya
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

// My Bookings (token se)
router.get('/my', protect, getMyBookings);

// ✅ User ki bookings by userId (profile page ke liye)
router.get('/user/:id', protect, getBookingsByUserId);

// All Bookings (Admin/Staff)
router.get(
  '/all',
  protect,
  staffRoles('admin', 'manager', 'receptionist'),
  getAllBookings
);

// Update Booking Status
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

// Payment Status Update
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