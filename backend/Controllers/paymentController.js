const Payment = require('../models/Payment');
const Booking = require('../models/Booking');

// Create Payment
const createPayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod } = req.body;

    // Booking check karo
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Already paid check karo
    if (booking.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Booking already paid' });
    }

    // Payment banao
    const payment = await Payment.create({
      bookingId,
      amount: booking.totalAmount,
      paymentMethod,
      paymentStatus: 'paid',
      transactionId: 'TXN' + Date.now()
    });

    // Booking payment status update karo
    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid' });

    res.status(201).json({ message: 'Payment successful', payment });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Invoice
const getInvoice = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: 'bookingId',
        populate: [
          { path: 'userId', select: 'name email phone' },
          { path: 'roomId', select: 'roomNumber type price' }
        ]
      });

    if (!payment) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(payment);

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { createPayment, getInvoice };