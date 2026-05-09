const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTaskStatus } = require('../controllers/housekeepingController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, adminOnly, createTask);
router.get('/', protect, adminOnly, getAllTasks);
router.put('/:id', protect, updateTaskStatus);

module.exports = router;