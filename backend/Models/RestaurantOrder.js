const mongoose = require ('mongoose');

const restaurantOrder = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Preparing",
      "Ready",
      "Delivered"
    ],
    default: "Pending"
  },

  estimatedTime: {
    type: Number,
    default: 20
  },

  roomNumber: String

}, { timestamps: true });

export default mongoose.model("RestaurantOrder",restaurantOrder);