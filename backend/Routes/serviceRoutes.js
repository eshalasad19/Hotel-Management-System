const express = require('express');
const router = express.Router();
const { createService, getAllServices, updateServiceStatus } = require('../Controllers/serviceController');
const { protect, adminOnly, staffRoles } = require('../Middleware/authMiddleware');

router.post('/', protect, createService);
router.get('/', protect, staffRoles('admin', 'manager', 'receptionist'), getAllServices);
router.put('/:id', protect, staffRoles('admin', 'manager', 'receptionist'), updateServiceStatus);

module.exports = router;