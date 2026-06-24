const Booking = require("../Models/Booking");
const Room = require("../Models/Room");
const User = require('../Models/User');
const sendEmail = require('../Services/emailService');
const auditLog = require('../Services/auditLogService'); // ✅ ADD
const {
  bookingConfirmationTemplate,
  cancellationTemplate,
} = require('../Utils/emailTemplates');

// ========================
// CREATE BOOKING
// ========================
const createBooking = async (req, res) => {
  try {
    const {
      roomId, guestName, guestPhone, guestEmail,
      checkInDate, checkOutDate, guests, specialRequests,
      totalAmount, bookingStatus, paymentMethod, paymentStatus,
    } = req.body;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });
    if (room.status !== "available") return res.status(400).json({ message: "Room is not available" });

    let amount = totalAmount;
    if (!amount) {
      const days = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
      amount = days * room.price;
    }

    let finalPaymentStatus = paymentMethod === "online" ? "paid" : (paymentStatus || "pending");
    let finalBookingStatus = finalPaymentStatus === "paid" ? "confirmed" : (bookingStatus || "pending");
    let finalRoomStatus = finalPaymentStatus === "paid" ? "occupied" : "reserved";

    const booking = await Booking.create({
      userId: req.body.userId || req.user?._id,
      roomId, guestName: guestName || "", guestPhone: guestPhone || "",
      guestEmail: guestEmail || "", checkInDate, checkOutDate, guests,
      totalAmount: amount, specialRequests,
      bookingStatus: finalBookingStatus,
      paymentMethod, paymentStatus: finalPaymentStatus,
    });

    if (booking.userId) await User.findByIdAndUpdate(booking.userId, { $push: { bookings: booking._id } });
    await Room.findByIdAndUpdate(roomId, { status: finalRoomStatus });

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: 'BOOKING_CREATED',
      targetModel: 'Booking',
      targetId: booking._id,
      description: `New booking created — Room ${room.roomNumber} for ${guestName || 'Guest'}`,
      metadata: {
        roomNumber: room.roomNumber,
        guestName: guestName,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalAmount: amount,
        paymentMethod,
      },
    });

    // Send emails
    await sendEmail({
      to: booking.guestEmail,
      subject: 'Booking Confirmation',
      html: bookingConfirmationTemplate({
        name: booking.guestName, roomNo: room.roomNumber,
        checkInDate: booking.checkInDate, checkOutDate: booking.checkOutDate,
        totalPrice: booking.totalAmount, paymentMethod: booking.paymentMethod,
        paymentStatus: booking.paymentStatus,
      }),
    });

    await sendEmail({
      to: 'adminhotel@gmail.com',
      subject: 'New Booking Received',
      html: `<h2>New Booking Alert</h2>
        <p><strong>Guest:</strong> ${booking.guestName}</p>
        <p><strong>Room:</strong> ${room.roomNumber}</p>
        <p><strong>Check-In:</strong> ${booking.checkInDate}</p>
        <p><strong>Check-Out:</strong> ${booking.checkOutDate}</p>
        <p><strong>Total:</strong> Rs. ${booking.totalAmount}</p>
        <p><strong>Payment:</strong> ${booking.paymentStatus}</p>`,
    });

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// MY BOOKINGS
// ========================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("roomId", "name roomNumber type price status images")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// GET BOOKINGS BY USER ID
// ========================
const getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.id })
      .populate("roomId", "name roomNumber type price status images")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// ALL BOOKINGS (Admin)
// ========================
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .populate("roomId", "name roomNumber type price status")
      .sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// UPDATE BOOKING STATUS
// ========================
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const previousStatus = booking.bookingStatus;

    if (bookingStatus === "cancelled" && booking.bookingStatus !== "cancelled") {
      await Room.findByIdAndUpdate(booking.roomId, { status: "available" });
      const room = await Room.findById(booking.roomId);
      await sendEmail({
        to: booking.guestEmail,
        subject: 'Booking Cancelled',
        html: cancellationTemplate({
          name: booking.guestName, roomNo: room?.roomNumber,
          checkInDate: booking.checkInDate, checkOutDate: booking.checkOutDate,
        }),
      });
    }

    if (bookingStatus === "completed" && booking.bookingStatus !== "completed") {
      await Room.findByIdAndUpdate(booking.roomId, { status: "available" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { ...(bookingStatus && { bookingStatus }), ...(paymentStatus && { paymentStatus }) },
      { new: true }
    );

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: bookingStatus === 'cancelled' ? 'BOOKING_CANCELLED' : 'BOOKING_UPDATED',
      targetModel: 'Booking',
      targetId: booking._id,
      description: `Booking status changed: ${previousStatus} → ${bookingStatus || previousStatus}`,
      metadata: { previousStatus, newStatus: bookingStatus, paymentStatus },
      severity: bookingStatus === 'cancelled' ? 'warning' : 'info',
    });

    res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ========================
// CHECK-IN
// ========================
const checkInBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('roomId', 'roomNumber');
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (!["confirmed", "pending"].includes(booking.bookingStatus)) {
      return res.status(400).json({ success: false, message: "Only confirmed or pending bookings can be checked in" });
    }

    booking.bookingStatus = "checked_in";
    await booking.save();
    await Room.findByIdAndUpdate(booking.roomId, { status: "occupied" });

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: 'BOOKING_CHECKED_IN',
      targetModel: 'Booking',
      targetId: booking._id,
      description: `Guest ${booking.guestName} checked in — Room ${booking.roomId?.roomNumber}`,
      metadata: { guestName: booking.guestName, roomId: booking.roomId },
    });

    res.status(200).json({ success: true, message: "Guest checked in successfully", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================
// CHECK-OUT
// ========================
const checkOutBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('roomId', 'roomNumber');
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.bookingStatus !== "checked_in") {
      return res.status(400).json({ success: false, message: "Only checked-in guests can checkout" });
    }
    if (booking.paymentStatus !== "paid") {
      return res.status(400).json({ success: false, message: "Payment is pending. Please collect payment before checkout." });
    }

    booking.bookingStatus = "checked_out";
    await booking.save();
    await Room.findByIdAndUpdate(booking.roomId, { status: "cleaning" });

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: 'BOOKING_CHECKED_OUT',
      targetModel: 'Booking',
      targetId: booking._id,
      description: `Guest ${booking.guestName} checked out — Room sent to cleaning`,
      metadata: { guestName: booking.guestName, roomId: booking.roomId },
    });

    res.status(200).json({ success: true, message: "Guest checked out successfully", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================
// COMPLETE BOOKING
// ========================
const completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.bookingStatus !== "checked_out") {
      return res.status(400).json({ success: false, message: "Booking must be checked out first" });
    }

    booking.bookingStatus = "completed";
    await booking.save();
    await Room.findByIdAndUpdate(booking.roomId, { status: "available" });

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: 'BOOKING_UPDATED',
      targetModel: 'Booking',
      targetId: booking._id,
      description: `Booking completed — Room marked available`,
    });

    res.status(200).json({ success: true, message: "Booking completed successfully", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ========================
// UPDATE PAYMENT STATUS
// ========================
const updatePaymentStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    booking.paymentStatus = "paid";
    if (booking.bookingStatus === "pending") booking.bookingStatus = "confirmed";
    await booking.save();
    await Room.findByIdAndUpdate(booking.roomId, { status: "occupied" });

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: 'PAYMENT_RECEIVED',
      targetModel: 'Booking',
      targetId: booking._id,
      description: `Payment marked as paid for booking — Rs. ${booking.totalAmount}`,
      metadata: { amount: booking.totalAmount, guestName: booking.guestName },
    });

    res.status(200).json({ success: true, message: "Payment marked as paid", booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking, getMyBookings, getBookingsByUserId,
  getAllBookings, updateBookingStatus, checkInBooking,
  checkOutBooking, completeBooking, updatePaymentStatus,
};
