const express = require('express');
const router = express.Router();
const { createPayment, getInvoice, getAllPayments } = require('../controllers/paymentController');
const { protect, adminOnly, staffRoles } = require('../middleware/authMiddleware');

router.post('/', protect, createPayment);
router.get('/', protect, staffRoles('admin', 'manager'), getAllPayments);
router.get('/invoice/:id', protect, staffRoles('admin', 'manager'), getInvoice);

module.exports = router;