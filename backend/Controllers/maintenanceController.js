const Maintenance = require('../Models/Maintenance');
const auditLog = require('../Services/auditLogService'); // ✅ ADD

// ========================
// CREATE MAINTENANCE REQUEST
// ========================
const createMaintenance = async (req, res) => {
  try {
    const { roomId, issue, issueType, priority, assignedTo, dueDate, notes } = req.body;

    const maintenance = await Maintenance.create({
      roomId, issue, issueType, priority,
      assignedTo: assignedTo || undefined,
      dueDate: dueDate || undefined,
      notes,
      roomNumber: req.body.roomNumber || '',
      reportedBy: req.user?._id,
    });

    // ✅ AUDIT LOG
    await auditLog.log(req, {
      action: 'MAINTENANCE_CREATED',
      targetModel: 'Maintenance',
      targetId: maintenance._id,
      description: `Maintenance request created — ${issueType}: ${issue}`,
      metadata: { roomId, issueType, priority, issue },
      severity: priority === 'high' ? 'warning' : 'info',
    });

    res.status(201).json({ message: 'Maintenance request created', maintenance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// GET ALL MAINTENANCE
// ========================
const getAllMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.find()
      .populate('roomId', 'roomNumber type')
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json(maintenance);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// UPDATE MAINTENANCE STATUS
// ========================
const updateMaintenanceStatus = async (req, res) => {
  try {
    const updates = { ...req.body };
    const previous = await Maintenance.findById(req.params.id);

    if (req.body.status === 'resolved') updates.resolvedAt = new Date();

    const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!maintenance) return res.status(404).json({ message: 'Not found' });

    // ✅ AUDIT LOG
    const isResolved = req.body.status === 'resolved';
    await auditLog.log(req, {
      action: isResolved ? 'MAINTENANCE_RESOLVED' : 'MAINTENANCE_CREATED',
      targetModel: 'Maintenance',
      targetId: maintenance._id,
      description: isResolved
        ? `Maintenance issue resolved`
        : `Maintenance status updated: ${previous?.status} → ${req.body.status}`,
      metadata: { previousStatus: previous?.status, newStatus: req.body.status },
    });

    res.status(200).json({ message: 'Updated', maintenance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ========================
// DELETE MAINTENANCE
// ========================
const deleteMaintenance = async (req, res) => {
  try {
    await Maintenance.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createMaintenance, getAllMaintenance, updateMaintenanceStatus, deleteMaintenance };
