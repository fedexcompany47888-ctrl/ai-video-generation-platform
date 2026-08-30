/**
 * Notification Routes
 * Handles notifications and alerts
 */

const express = require('express');
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All notification routes require authentication
router.use(verifyToken);

/**
 * GET /api/notifications
 * Get all user notifications
 */
router.get('/', notificationController.getNotifications);

/**
 * GET /api/notifications/unread
 * Get unread notifications
 */
router.get('/unread', notificationController.getUnreadNotifications);

/**
 * POST /api/notifications/:notificationId/read
 * Mark notification as read
 */
router.post('/:notificationId/read', notificationController.markAsRead);

/**
 * POST /api/notifications/read-all
 * Mark all notifications as read
 */
router.post('/read-all', notificationController.markAllAsRead);

/**
 * DELETE /api/notifications/:notificationId
 * Delete notification
 */
router.delete('/:notificationId', notificationController.deleteNotification);

/**
 * DELETE /api/notifications
 * Delete all notifications
 */
router.delete('/', notificationController.deleteAllNotifications);

module.exports = router;