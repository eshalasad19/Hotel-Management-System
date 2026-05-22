const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder
} = require('../Controllers/restaurantOrderController');
const { protect, adminOnly, staffRoles } = require('../Middleware/authMiddleware');

router.post('/', protect, staffRoles('admin', 'manager', 'receptionist'), createOrder);
router.get('/', protect, staffRoles('admin', 'manager', 'receptionist'), getOrders);
router.put('/:id', protect, staffRoles('admin', 'manager', 'receptionist'), updateOrderStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;
