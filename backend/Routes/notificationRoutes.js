const express = require('express');
const router = express.Router();
const { createNotification, getMyNotifications, markAsRead, deleteNotification } = require('../Controllers/notificationController');
const { protect, adminOnly } = require('../Middleware/authMiddleware');

router.post('/', protect, adminOnly, createNotification);
router.get('/my', protect, getMyNotifications);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteNotification);

module.exports = router;