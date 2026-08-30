/**
 * User Routes
 * Handles user profile management
 */

const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All user routes require authentication
router.use(verifyToken);

/**
 * GET /api/users/profile
 * Get current user profile
 */
router.get('/profile', userController.getProfile);

/**
 * PUT /api/users/profile
 * Update user profile
 */
router.put(
  '/profile',
  [
    body('name').optional().trim().isLength({ min: 2 }),
    body('email').optional().isEmail().normalizeEmail(),
  ],
  userController.updateProfile
);

/**
 * POST /api/users/change-password
 * Change user password
 */
router.post(
  '/change-password',
  [
    body('currentPassword').exists(),
    body('newPassword').isLength({ min: 8 }),
  ],
  userController.changePassword
);

/**
 * GET /api/users/subscription
 * Get user subscription details
 */
router.get('/subscription', userController.getSubscription);

/**
 * PUT /api/users/subscription
 * Update user subscription
 */
router.put('/subscription', userController.updateSubscription);

/**
 * GET /api/users/usage
 * Get user usage statistics
 */
router.get('/usage', userController.getUsage);

/**
 * DELETE /api/users/account
 * Delete user account
 */
router.delete('/account', userController.deleteAccount);

/**
 * GET /api/users/notifications
 * Get user notification preferences
 */
router.get('/notifications', userController.getNotificationPreferences);

/**
 * PUT /api/users/notifications
 * Update notification preferences
 */
router.put('/notifications', userController.updateNotificationPreferences);

module.exports = router;