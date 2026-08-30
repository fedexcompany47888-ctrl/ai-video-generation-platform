/**
 * Project Routes
 * Handles project management
 */

const express = require('express');
const { body } = require('express-validator');
const projectController = require('../controllers/projectController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All project routes require authentication
router.use(verifyToken);

/**
 * GET /api/projects
 * Get all user projects
 */
router.get('/', projectController.getAllProjects);

/**
 * POST /api/projects
 * Create a new project
 */
router.post(
  '/',
  upload.single('referenceImage'),
  [
    body('name').trim().isLength({ min: 1 }),
    body('description').optional().trim(),
  ],
  projectController.createProject
);

/**
 * GET /api/projects/:projectId
 * Get project details
 */
router.get('/:projectId', projectController.getProject);

/**
 * PUT /api/projects/:projectId
 * Update project
 */
router.put(
  '/:projectId',
  [
    body('name').optional().trim().isLength({ min: 1 }),
    body('description').optional().trim(),
  ],
  projectController.updateProject
);

/**
 * DELETE /api/projects/:projectId
 * Delete project
 */
router.delete('/:projectId', projectController.deleteProject);

/**
 * POST /api/projects/:projectId/duplicate
 * Duplicate a project
 */
router.post('/:projectId/duplicate', projectController.duplicateProject);

/**
 * GET /api/projects/:projectId/videos
 * Get all videos in a project
 */
router.get('/:projectId/videos', projectController.getProjectVideos);

/**
 * POST /api/projects/:projectId/search
 * Search within project
 */
router.post('/:projectId/search', projectController.searchProject);

module.exports = router;