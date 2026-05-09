const express = require('express');
const router = express.Router();
const { createPayment, getInvoice } = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createPayment);
router.get('/invoice/:id', protect, adminOnly, getInvoice);

module.exports = router;