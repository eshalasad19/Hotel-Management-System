const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests, specialRequests, totalAmount, bookingStatus } = req.body;

    // Room check karo
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Room available hai?
    if (room.status !== 'available') {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Total amount calculate karo agar nahi diya
    let amount = totalAmount;
    if (!amount) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      amount = days * room.price;
    }

    // Booking banao
    const booking = await Booking.create({
      userId: req.body.userId || req.user.id,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount: amount,
      specialRequests,
      bookingStatus: bookingStatus || 'confirmed'
    });

    // Room status occupied karo
    await Room.findByIdAndUpdate(roomId, { status: 'occupied' });

    res.status(201).json({ message: 'Booking created successfully', booking });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('roomId', 'roomNumber type price status');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// All Bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .populate('roomId', 'roomNumber type price status')
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Booking Status (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Agar cancel ho rahi hai to room available karo
    if (bookingStatus === 'cancelled' && booking.bookingStatus !== 'cancelled') {
      await Room.findByIdAndUpdate(booking.roomId, { status: 'available' });
    }

    // Agar completed ho rahi hai to room available karo
    if (bookingStatus === 'completed' && booking.bookingStatus !== 'completed') {
      await Room.findByIdAndUpdate(booking.roomId, { status: 'available' });
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        ...(bookingStatus && { bookingStatus }),
        ...(paymentStatus && { paymentStatus })
      },
      { new: true }
    );

    res.status(200).json({ message: 'Booking updated successfully', booking: updatedBooking });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };