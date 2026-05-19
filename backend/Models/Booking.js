const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },

  guestName: {
    type: String
  },

  guestPhone: {
    type: String
  },

  guestEmail: {
    type: String
  },

  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },

  checkInDate: {
    type: Date,
    required: true
  },

  checkOutDate: {
    type: Date,
    required: true
  },

  guests: {
    type: Number,
    required: true
  },

  totalAmount: {
    type: Number,
    required: true
  },

  bookingStatus: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'checked_in',
      'checked_out',
      'completed',
      'cancelled'
    ],
    default: 'pending'
  },

  paymentMethod: {
    type: String,
    enum: ['cash', 'online'],
    default: 'cash'
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  },

  specialRequests: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);