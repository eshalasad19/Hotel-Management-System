const express = require('express');
const router = express.Router();
const {
  createNotification, getMyNotifications, getAllNotifications,
  markAsRead, markAllAsRead, deleteNotification
} = require('../Controllers/notificationController');
const { protect, adminOnly, staffRoles } = require('../Middleware/authMiddleware');

router.post('/', protect, adminOnly, createNotification);
router.get('/my', protect, getMyNotifications);
router.get('/all', protect, staffRoles('admin', 'manager'), getAllNotifications);
router.put('/mark-all-read', protect, markAllAsRead);
router.put('/:id/read', protect, markAsRead);
router.delete('/:id', protect, deleteNotification);

module.exports = router;