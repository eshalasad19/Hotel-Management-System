const Feedback = require('../models/Feedback');

// Submit Feedback
const submitFeedback = async (req, res) => {
  try {
    const { rating, review } = req.body;

    const feedback = await Feedback.create({
      userId: req.user.id,
      rating,
      review
    });

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email');
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { submitFeedback, getAllFeedbacks };