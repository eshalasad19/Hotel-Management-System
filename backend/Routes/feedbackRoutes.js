const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks, deleteFeedback, replyToFeedback } = require('../Controllers/feedbackController');
const { protect, staffRoles, adminOnly } = require('../Middleware/authMiddleware');

router.post('/', submitFeedback);
router.get('/', protect, staffRoles('admin', 'manager'), getAllFeedbacks);
router.put('/:id/reply', protect, staffRoles('admin', 'manager'), replyToFeedback);
router.delete('/:id', protect, adminOnly, deleteFeedback);

module.exports = router;