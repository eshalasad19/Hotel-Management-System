const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['single', 'double', 'suite', 'deluxe'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  amenities: {
    type: [String]
  },
images: {
  type: [String],
  default: [],
},
  floor: {
    type: String,
    enum: ['ground', 'first', 'second'],
    required: true
  },
  status: {
    type: String,
    enum: [
      "available",
      "reserved",
      "occupied",
      "maintenance"
    ],
    default: "available",
  },
}, { timestamps: true });
// AUTO PREFIX MIDDLEWARE
roomSchema.pre("save", function (next) {

  if (this.floor === "Ground Floor") {
    this.roomPrefix = "GF";
  }

  if (this.floor === "First Floor") {
    this.roomPrefix = "FF";
  }

  if (this.floor === "Second Floor") {
    this.roomPrefix = "SF";
  }

  next();
});


module.exports = mongoose.model('Room', roomSchema);
