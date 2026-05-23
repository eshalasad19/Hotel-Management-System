// ===== feedbackController.js (Controller) =====

const Feedback = require('../Models/Feedback');

// POST /api/feedbacks
const submitFeedback = async (req, res) => {
  try {
    const { name, email, phone, rating, review, userId } = req.body;

    // Validation
    if (!rating || Number(rating) < 1 || Number(rating) > 5) {
      return res.status(400).json({ error: "Rating 1 to 5 ke beech hona chahiye" });
    }
    if (!review?.trim()) {
      return res.status(400).json({ error: "Review required hai" });
    }

    const feedbackData = {
      name: name || "Guest",
      email: email || "",
      phone: phone || "",
      rating: Number(rating),
      review: review.trim(),
    };

    // userId sirf tab add karo jab valid MongoDB ObjectId ho
    if (userId && /^[a-fA-F0-9]{24}$/.test(userId)) {
      feedbackData.userId = userId;
    }

    const feedback = await Feedback.create(feedbackData);

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });

  } catch (err) {
    console.error("Submit feedback error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('userId', 'name email')
      .populate('repliedBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (err) {
    console.error("Get feedbacks error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/feedbacks/:id
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    res.status(200).json({ message: 'Feedback deleted' });
  } catch (err) {
    console.error("Delete feedback error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/feedbacks/:id/reply
const replyToFeedback = async (req, res) => {
  try {
    const { adminReply } = req.body;

    if (!adminReply?.trim()) {
      return res.status(400).json({ message: 'Reply text required hai' });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      {
        adminReply: adminReply.trim(),
        repliedAt: new Date(),
        repliedBy: req.user.id
      },
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('repliedBy', 'name');

    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });

    res.status(200).json({ message: 'Reply saved', feedback });
  } catch (err) {
    console.error("Reply feedback error:", err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { submitFeedback, getAllFeedbacks, deleteFeedback, replyToFeedback };