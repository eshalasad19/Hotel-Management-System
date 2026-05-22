const Maintenance = require('../Models/Maintenance');

// Create Maintenance Request
const createMaintenance = async (req, res) => {
  try {
    const { roomId, issue } = req.body;

    const maintenance = await Maintenance.create({
      roomId,
      issue,
      reportedBy: req.user.id
    });

    res.status(201).json({ message: 'Maintenance request created', maintenance });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Maintenance Requests (Admin)
const getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.find()
      .populate('roomId', 'roomNumber type')
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email');
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Maintenance Status (Admin)
const updateMaintenanceStatus = async (req, res) => {
  try {
    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, assignedTo: req.body.assignedTo },
      { new: true }
    );
    if (!maintenance) {
      return res.status(404).json({ message: 'Maintenance request not found' });
    }
    res.status(200).json({ message: 'Maintenance status updated', maintenance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createMaintenance, getAllMaintenance, updateMaintenanceStatus };