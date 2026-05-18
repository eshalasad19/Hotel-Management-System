const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Create Booking
const createBooking = async (req, res) => {
  try {
    const {
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
      totalAmount,
      bookingStatus,
    } = req.body;

    // Room check karo
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      });
    }

    // Room available hai?
    if (room.status !== "available") {
      return res.status(400).json({
        message: "Room is not available",
      });
    }

    // Total amount calculate karo agar nahi diya
    let amount = totalAmount;

    if (!amount) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      const days = Math.ceil(
        (checkOut - checkIn) / (1000 * 60 * 60 * 24)
      );

      amount = days * room.price;
    }

    // Booking create
    const booking = await Booking.create({
      userId: req.body.userId || req.user.id,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      totalAmount: amount,
      specialRequests,
      bookingStatus: bookingStatus || "confirmed",
    });

    // Room reserved karo
    await Room.findByIdAndUpdate(roomId, {
      status: "reserved",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// My Bookings
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    }).populate(
      "roomId",
      "roomNumber type price status"
    );

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// All Bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .populate("roomId", "roomNumber type price status")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// Update Booking Status (Old Generic Update)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // Cancelled booking
    if (
      bookingStatus === "cancelled" &&
      booking.bookingStatus !== "cancelled"
    ) {
      await Room.findByIdAndUpdate(
        booking.roomId,
        {
          status: "available",
        }
      );
    }

    // Completed booking
    if (
      bookingStatus === "completed" &&
      booking.bookingStatus !== "completed"
    ) {
      await Room.findByIdAndUpdate(
        booking.roomId,
        {
          status: "available",
        }
      );
    }

    // Update booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        ...(bookingStatus && { bookingStatus }),
        ...(paymentStatus && { paymentStatus }),
      },
      { new: true }
    );

    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// CHECK-IN
const checkInBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only confirmed bookings
    if (booking.bookingStatus !== "confirmed") {
      return res.status(400).json({
        success: false,
        message: "Only confirmed bookings can be checked in",
      });
    }

    // Update booking
    booking.bookingStatus = "checked_in";
    await booking.save();

    // Room occupied
    await Room.findByIdAndUpdate(
      booking.roomId,
      {
        status: "occupied",
      }
    );

    res.status(200).json({
      success: true,
      message: "Guest checked in successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CHECK-OUT
const checkOutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only checked-in guests
    if (booking.bookingStatus !== "checked_in") {
      return res.status(400).json({
        success: false,
        message: "Only checked-in guests can checkout",
      });
    }

    // Update booking
    booking.bookingStatus = "checked_out";
    await booking.save();

    // Room cleaning
    await Room.findByIdAndUpdate(
      booking.roomId,
      {
        status: "cleaning",
      }
    );

    res.status(200).json({
      success: true,
      message: "Guest checked out successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// COMPLETE BOOKING
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Only checked-out bookings
    if (booking.bookingStatus !== "checked_out") {
      return res.status(400).json({
        success: false,
        message: "Booking must be checked out first",
      });
    }

    // Complete booking
    booking.bookingStatus = "completed";
    await booking.save();

    // Room available again
    await Room.findByIdAndUpdate(
      booking.roomId,
      {
        status: "available",
      }
    );

    res.status(200).json({
      success: true,
      message: "Booking completed successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  checkInBooking,
  checkOutBooking,
  completeBooking,
};