const express = require('express');
const router = express.Router();
const { createNotification, getMyNotifications, markAsRead, deleteNotification } = require('../controllers/notificationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, adminOnly, createNotification);
router.get('/my', protect, getMyNotifications);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteNotification);

module.exports = router;