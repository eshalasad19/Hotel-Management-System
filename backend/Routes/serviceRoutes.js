const express = require('express');
const router = express.Router();
const { createService, getAllServices, updateServiceStatus } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createService);
router.get('/', protect, adminOnly, getAllServices);
router.put('/:id', protect, adminOnly, updateServiceStatus);

module.exports = router;