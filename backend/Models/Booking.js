const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  paymentStatus: {
  type: String,
  enum: ['unpaid', 'partial', 'paid', 'refunded'],
  default: 'unpaid'
},
  specialRequests: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);