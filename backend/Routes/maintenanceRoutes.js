const express = require('express');
const router = express.Router();
const { createMaintenance, getAllMaintenance, updateMaintenanceStatus } = require('../controllers/maintenanceController');
const { protect, adminOnly, staffRoles } = require('../middleware/authMiddleware');

router.post('/', protect, createMaintenance);
router.get('/', protect, staffRoles('admin', 'manager', 'maintenance'), getAllMaintenance);
router.put('/:id', protect, staffRoles('admin', 'manager', 'maintenance'), updateMaintenanceStatus);

module.exports = router;