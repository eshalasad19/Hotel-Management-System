const Housekeeping = require('../Models/Housekeeping');

// Create Housekeeping Task (Admin)
const createTask = async (req, res) => {
  try {
    const { roomId, assignedStaff } = req.body;

    const task = await Housekeeping.create({
      roomId,
      assignedStaff
    });

    res.status(201).json({ message: 'Housekeeping task created', task });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Tasks (Admin)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Housekeeping.find()
      .populate('roomId', 'roomNumber type')
      .populate('assignedStaff', 'name email');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Task Status
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Housekeeping.findByIdAndUpdate(
      req.params.id,
      {
        cleaningStatus: req.body.cleaningStatus,
        completedAt: req.body.cleaningStatus === 'completed' ? new Date() : null
      },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task status updated', task });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await Housekeeping.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json({ message: 'Task deleted' });
  } catch(err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createTask, getAllTasks, updateTaskStatus, deleteTask };