const Maintenance = require('../Models/Maintenance');

const createMaintenance = async (req, res) => {
  try {
    const { roomId, issue, issueType, priority, assignedTo, dueDate, notes } = req.body;
    const maintenance = await Maintenance.create({
      roomId, issue, issueType, priority,
      assignedTo: assignedTo || undefined,
      dueDate:    dueDate    || undefined,
      notes,
      reportedBy: req.user?.id
    });
    res.status(201).json({ message: 'Maintenance request created', maintenance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.find()
      .populate('roomId',     'roomNumber type')
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateMaintenanceStatus = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.body.status === 'resolved') updates.resolvedAt = new Date();
    const maintenance = await Maintenance.findByIdAndUpdate(
      req.params.id, updates, { new: true }
    );
    if (!maintenance) return res.status(404).json({ message: 'Not found' });
    res.status(200).json({ message: 'Updated', maintenance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createMaintenance, getAllMaintenance, updateMaintenanceStatus, deleteMaintenance };