/**
 * Script Routes
 * Handles script management and AI features
 */

const express = require('express');
const { body } = require('express-validator');
const scriptController = require('../controllers/scriptController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All script routes require authentication
router.use(verifyToken);

/**
 * POST /api/scripts/create
 * Create a new script
 */
router.post(
  '/create',
  [body('projectId').exists(), body('content').trim().isLength({ min: 1 })],
  scriptController.createScript
);

/**
 * GET /api/scripts/:scriptId
 * Get script details
 */
router.get('/:scriptId', scriptController.getScript);

/**
 * PUT /api/scripts/:scriptId
 * Update script
 */
router.put('/:scriptId', scriptController.updateScript);

/**
 * DELETE /api/scripts/:scriptId
 * Delete script
 */
router.delete('/:scriptId', scriptController.deleteScript);

/**
 * POST /api/scripts/:scriptId/translate
 * Translate script to another language
 */
router.post(
  '/:scriptId/translate',
  [body('targetLanguage').isLength({ min: 2, max: 5 })],
  scriptController.translateScript
);

/**
 * POST /api/scripts/:scriptId/rewrite
 * Rewrite script using AI
 */
router.post(
  '/:scriptId/rewrite',
  [body('style').optional().isIn(['professional', 'casual', 'humorous', 'academic'])],
  scriptController.rewriteScript
);

/**
 * POST /api/scripts/:scriptId/import
 * Import script from text file
 */
router.post('/:scriptId/import', scriptController.importScript);

/**
 * GET /api/scripts/:scriptId/character-count
 * Get character count and statistics
 */
router.get('/:scriptId/character-count', scriptController.getCharacterCount);

module.exports = router;