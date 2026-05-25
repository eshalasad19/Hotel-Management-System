const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  designation: { type: String, required: true },
  bio:         { type: String },
  image:       { type: String },
  order:       { type: Number, default: 0 },
});

const aboutUsSchema = new mongoose.Schema({
  // Hotel Info
  hotelName:   { type: String, default: 'The Luxury Stay' },
  tagline:     { type: String, default: 'Where Comfort Meets Excellence' },
  story:       { type: String },
  mission:     { type: String },
  vision:      { type: String },

  // Stats
  yearsOfExperience: { type: Number, default: 0 },
  totalRooms:        { type: Number, default: 0 },
  guestsServed:      { type: Number, default: 0 },
  staffMembers:      { type: Number, default: 0 },

  // Team
  team: [teamMemberSchema],

  // Meta
  isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', aboutUsSchema);