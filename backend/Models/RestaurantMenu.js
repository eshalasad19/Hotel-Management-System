const mongoose = require("mongoose");

const RestaurantMenu = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: String,

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    enum: ["Desi", "Italian", "Chinese", "FastFood"],
    required: true
  },

  image: String,

  isAvailable: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Menu", RestaurantMenu);