const express = require('express');
const router  = express.Router();
const {
  getAboutUs, updateAboutUs,
  addTeamMember, updateTeamMember, deleteTeamMember
} = require('../Controllers/aboutUsController');
const { protect, adminOnly, staffRoles } = require('../Middleware/authMiddleware');
const upload = require('../Middleware/uploadMiddleware');

// Public — user website ke liye
router.get('/', getAboutUs);

// Admin routes
router.put('/',                        protect, staffRoles('admin', 'manager'), updateAboutUs);
router.post('/team',                   protect, staffRoles('admin', 'manager'), upload.single('image'), addTeamMember);
router.put('/team/:memberId',          protect, staffRoles('admin', 'manager'), upload.single('image'), updateTeamMember);
router.delete('/team/:memberId',       protect, adminOnly, deleteTeamMember);

module.exports = router;