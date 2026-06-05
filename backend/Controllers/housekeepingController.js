const Housekeeping = require('../Models/Housekeeping');

const createTask = async (req, res) => {
  try {
    const { roomId, assignedStaff, taskType, priority, notes, dueDate, guestRequest, roomNumber } = req.body;

    if (guestRequest) {
      const task = await Housekeeping.create({
        roomId: roomId || undefined,
        assignedStaff: undefined,
        taskType: taskType || 'room_cleaning',
        priority: priority || 'medium',
        notes: notes || '',
        dueDate: dueDate || undefined,
        guestRequest: true,
        roomNumber: roomNumber || '',
        requestedBy: req.user?.id || req.user?._id || undefined,
      })
      return res.status(201).json({ message: 'Task created', task });
    }

    const task = await Housekeeping.create({
      roomId, assignedStaff, taskType, priority, notes, dueDate
    });
    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Housekeeping.find().lean()
      .populate('roomId', 'roomNumber type')
      .populate('assignedStaff', 'name email')
      .populate('requestedBy', 'name email phone')
      .sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.body.cleaningStatus === 'completed') updates.completedAt = new Date();
    const task = await Housekeeping.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Housekeeping.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createTask, getAllTasks, updateTaskStatus, deleteTask };