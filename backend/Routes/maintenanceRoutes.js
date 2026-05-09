const express = require('express');
const router = express.Router();
const { createMaintenance, getAllMaintenance, updateMaintenanceStatus } = require('../controllers/maintenanceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createMaintenance);
router.get('/', protect, adminOnly, getAllMaintenance);
router.put('/:id', protect, adminOnly, updateMaintenanceStatus);

module.exports = router;