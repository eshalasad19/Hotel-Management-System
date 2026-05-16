const express = require('express');
const router = express.Router();
const {
  addMenuItem,
  getMenu,
  getMenuByCategory,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/restaurantMenuController');
const { protect, adminOnly, staffRoles } = require('../middleware/authMiddleware');

router.get('/', getMenu);
router.get('/category/:category', getMenuByCategory);
router.post('/', protect, staffRoles('admin', 'manager'), addMenuItem);
router.put('/:id', protect, staffRoles('admin', 'manager'), updateMenuItem);
router.delete('/:id', protect, adminOnly, deleteMenuItem);

module.exports = router;
