const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'maintenance', 'kitchen', 'guest'],
    default: 'guest'
  },
  address: {
    type: String
  },
  bookings: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Booking'
}],
  // walk-in = admin ne booking ki, online = user ne website se booking ki
  guestType: {
    type: String,
    enum: ['walk-in', 'online'],
    default: 'online'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'on_leave', 'suspended'],
    default: 'active'
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);