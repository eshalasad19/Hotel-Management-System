const Housekeeping = require('../Models/Housekeeping');

const createTask = async (req, res) => {
  try {
    const { roomId, assignedStaff, taskType, priority, notes, dueDate } = req.body;
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
    const tasks = await Housekeeping.find()
      .populate('roomId', 'roomNumber type')
      .populate('assignedStaff', 'name email')
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