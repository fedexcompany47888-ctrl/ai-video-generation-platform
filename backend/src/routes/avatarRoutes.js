/**
 * Avatar Routes
 * Handles AI avatar generation and management
 */

const express = require('express');
const { body } = require('express-validator');
const avatarController = require('../controllers/avatarController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All avatar routes require authentication
router.use(verifyToken);

/**
 * POST /api/avatars/create
 * Create a new avatar from photo
 */
router.post(
  '/create',
  upload.single('photo'),
  [
    body('name').trim().isLength({ min: 1 }),
    body('gender').isIn(['male', 'female']),
  ],
  avatarController.createAvatar
);

/**
 * GET /api/avatars
 * Get all user avatars
 */
router.get('/', avatarController.getAllAvatars);

/**
 * GET /api/avatars/:avatarId
 * Get avatar details
 */
router.get('/:avatarId', avatarController.getAvatar);

/**
 * DELETE /api/avatars/:avatarId
 * Delete avatar
 */
router.delete('/:avatarId', avatarController.deleteAvatar);

/**
 * POST /api/avatars/:avatarId/customize
 * Customize avatar appearance
 */
router.post(
  '/:avatarId/customize',
  [
    body('expression').optional().isIn(['neutral', 'smile', 'serious', 'surprised']),
    body('backgroundColor').optional().matches(/^#[0-9A-F]{6}$/i),
  ],
  avatarController.customizeAvatar
);

/**
 * GET /api/avatars/:avatarId/preview
 * Get avatar preview image
 */
router.get('/:avatarId/preview', avatarController.getAvatarPreview);

module.exports = router;