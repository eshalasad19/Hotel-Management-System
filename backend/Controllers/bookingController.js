const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, guests, specialRequests } = req.body;

    // Room check karo
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Room available hai?
    if (room.status !== 'available') {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Total amount calculate karo
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24);
    const totalAmount = days * room.price;

    // Booking banao
    const booking = await Booking.create({
      userId: req.user.id,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount,
      specialRequests
    });

    // Room status update karo
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
      .populate('roomId', 'roomNumber type price');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// All Bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('roomId', 'roomNumber type price');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Booking Status (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 
        bookingStatus: req.body.bookingStatus,
        paymentStatus: req.body.paymentStatus  // ye line add karo
      },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json({ message: 'Booking updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus };