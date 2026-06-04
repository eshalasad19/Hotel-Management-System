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

// ✅ User apni booking cancel kare (sirf pending/confirmed)
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await require('../Models/Booking').findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const userId = req.user.id || req.user._id;
    if (String(booking.userId) !== String(userId))
      return res.status(403).json({ message: 'Not authorized' });

    if (!['pending', 'confirmed'].includes(booking.bookingStatus))
      return res.status(400).json({ message: 'Only pending or confirmed bookings can be cancelled' });

    booking.bookingStatus = 'cancelled';
    await booking.save();
    await require('../Models/Room').findByIdAndUpdate(booking.roomId, { status: 'available' });

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

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