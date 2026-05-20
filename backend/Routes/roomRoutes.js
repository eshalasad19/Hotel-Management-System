const express = require('express');
const router = express.Router();
const {
    addRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
  } = require('../controllers/roomController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getAllRooms);
router.get('/:id', getRoomById);
router.post('/', upload.array('images', 10), addRoom);
router.put(
  '/:id',
  protect,
  adminOnly,
  upload.array('images', 5),
  updateRoom
);
router.delete('/:id', protect, adminOnly, deleteRoom);

module.exports = router;