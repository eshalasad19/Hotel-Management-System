const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedbacks } = require('../controllers/feedbackController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, submitFeedback);
router.get('/', protect, adminOnly, getAllFeedbacks);

module.exports = router;