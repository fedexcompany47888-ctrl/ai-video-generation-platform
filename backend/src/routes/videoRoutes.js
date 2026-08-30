/**
 * Video Routes
 * Handles video generation and management
 */

const express = require('express');
const { body } = require('express-validator');
const videoController = require('../controllers/videoController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All video routes require authentication
router.use(verifyToken);

/**
 * GET /api/videos
 * Get all user videos
 */
router.get('/', videoController.getAllVideos);

/**
 * POST /api/videos/generate
 * Generate a new video
 */
router.post(
  '/generate',
  [
    body('projectId').exists(),
    body('script').trim().isLength({ min: 1 }),
    body('voiceSettings').exists(),
    body('videoSettings').exists(),
  ],
  videoController.generateVideo
);

/**
 * GET /api/videos/:videoId
 * Get video details
 */
router.get('/:videoId', videoController.getVideo);

/**
 * GET /api/videos/:videoId/status
 * Get video generation status
 */
router.get('/:videoId/status', videoController.getVideoStatus);

/**
 * PUT /api/videos/:videoId
 * Update video
 */
router.put('/:videoId', videoController.updateVideo);

/**
 * DELETE /api/videos/:videoId
 * Delete video
 */
router.delete('/:videoId', videoController.deleteVideo);

/**
 * POST /api/videos/:videoId/download
 * Download video
 */
router.post('/:videoId/download', videoController.downloadVideo);

/**
 * POST /api/videos/:videoId/share
 * Share video
 */
router.post(
  '/:videoId/share',
  [body('expiresIn').optional().isInt()],
  videoController.shareVideo
);

/**
 * POST /api/videos/:videoId/regenerate
 * Regenerate video
 */
router.post('/:videoId/regenerate', videoController.regenerateVideo);

/**
 * POST /api/videos/:videoId/preview
 * Generate video preview
 */
router.post('/:videoId/preview', videoController.generatePreview);

module.exports = router;