const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTaskStatus, deleteTask } = require('../Controllers/housekeepingController');
const { protect, adminOnly, staffRoles } = require('../Middleware/authMiddleware');

router.post('/', protect, staffRoles('admin', 'manager'), createTask);
router.get('/', protect, staffRoles('admin', 'manager', 'housekeeping'), getAllTasks);
router.put('/:id', protect, updateTaskStatus);
router.delete('/:id', protect, adminOnly, deleteTask);

module.exports = router;