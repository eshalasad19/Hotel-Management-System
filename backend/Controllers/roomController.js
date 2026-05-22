const Room = require('../Models/Room');

// Add Room
const addRoom = async (req, res) => {

  try {

    const imagePaths = req.files?.map(
      (file) => file.filename
    );

    const room = await Room.create({

      ...req.body,

      amenities: Array.isArray(req.body.amenities)
        ? req.body.amenities
        : [req.body.amenities],

      images: imagePaths,

    });

    res.status(201).json({
      message: 'Room added successfully',
      room
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

};

// Get All Rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Single Room
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Room
const updateRoom = async (req, res) => {

  try {

    const room = await Room.findById(
      req.params.id
    );

    const imagePaths = req.files?.map(
      (file) => file.filename
    );

    const updatedData = {
      ...req.body
    };

    if (imagePaths?.length > 0) {

      updatedData.images = imagePaths;

    } else {

      updatedData.images = room.images;

    }

    const updatedRoom =
      await Room.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

    res.status(200).json({
      message: 'Room updated successfully',
      room: updatedRoom
    });

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

};

// Delete Room
const deleteRoom = async (req, res) => {

  try {

    const room = await Room.findById(req.params.id);

    if (!room) {

      return res.status(404).json({
        message: 'Room not found'
      });

    }

    // DELETE PROTECTION

    if (
      room.status === 'occupied' ||
  room.status === 'reserved' ||
  room.status === 'cleaning' ||
  room.status === 'maintenance'
    ) {

     return res.status(400).json({
    message: 'Cannot delete active room'
      });

    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Room deleted successfully'
    });

  } catch (err) {

    res.status(500).json({
      message: 'Server error',
      error: err.message
    });

  }

};

module.exports = { addRoom, getAllRooms, getRoomById, updateRoom, deleteRoom };