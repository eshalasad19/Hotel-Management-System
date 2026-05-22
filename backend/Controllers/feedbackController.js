const Feedback = require('../Models/Feedback');

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

const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const replyToFeedback = async (req, res) => {
  try {
    const { adminReply } = req.body;
    if (!adminReply?.trim()) {
      return res.status(400).json({ message: 'Reply text is required' });
    }
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { adminReply: adminReply.trim(), repliedAt: new Date(), repliedBy: req.user.id },
      { new: true }
    ).populate('userId', 'name email').populate('repliedBy', 'name');
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.status(200).json({ message: 'Reply saved', feedback });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { submitFeedback, getAllFeedbacks, deleteFeedback, replyToFeedback };