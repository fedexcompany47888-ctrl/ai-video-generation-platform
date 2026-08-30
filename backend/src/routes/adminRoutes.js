/**
 * Admin Routes
 * Handles admin panel and analytics
 */

const express = require('express');
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');
const { verifyAdmin } = require('../middleware/admin');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(verifyToken);
router.use(verifyAdmin);

/**
 * GET /api/admin/dashboard
 * Get dashboard statistics
 */
router.get('/dashboard', adminController.getDashboard);

/**
 * GET /api/admin/users
 * Get all users
 */
router.get('/users', adminController.getAllUsers);

/**
 * GET /api/admin/users/:userId
 * Get specific user details
 */
router.get('/users/:userId', adminController.getUserDetails);

/**
 * PUT /api/admin/users/:userId
 * Update user (admin)
 */
router.put('/users/:userId', adminController.updateUser);

/**
 * DELETE /api/admin/users/:userId
 * Delete user (admin)
 */
router.delete('/users/:userId', adminController.deleteUser);

/**
 * GET /api/admin/videos
 * Get all videos
 */
router.get('/videos', adminController.getAllVideos);

/**
 * GET /api/admin/analytics
 * Get platform analytics
 */
router.get('/analytics', adminController.getAnalytics);

/**
 * GET /api/admin/revenue
 * Get revenue statistics
 */
router.get('/revenue', adminController.getRevenue);

/**
 * GET /api/admin/storage
 * Get storage statistics
 */
router.get('/storage', adminController.getStorage);

/**
 * GET /api/admin/subscriptions
 * Get subscription statistics
 */
router.get('/subscriptions', adminController.getSubscriptions);

module.exports = router;