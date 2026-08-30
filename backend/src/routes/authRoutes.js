/**
 * Authentication Routes
 * Handles user registration, login, password reset, etc.
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 */
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }),
    body('name').trim().isLength({ min: 2 }),
  ],
  authController.register
);

/**
 * POST /api/auth/login
 * User login
 */
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists(),
  ],
  authController.login
);

/**
 * POST /api/auth/logout
 * User logout
 */
router.post('/logout', verifyToken, authController.logout);

/**
 * POST /api/auth/refresh-token
 * Refresh JWT token
 */
router.post('/refresh-token', authController.refreshToken);

/**
 * POST /api/auth/forgot-password
 * Request password reset
 */
router.post(
  '/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  authController.forgotPassword
);

/**
 * POST /api/auth/reset-password
 * Reset password with token
 */
router.post(
  '/reset-password/:token',
  [
    body('password').isLength({ min: 8 }),
    body('confirmPassword').custom((value, { req }) => value === req.body.password),
  ],
  authController.resetPassword
);

/**
 * POST /api/auth/verify-email
 * Verify user email
 */
router.post('/verify-email/:token', authController.verifyEmail);

/**
 * POST /api/auth/resend-verification
 * Resend verification email
 */
router.post(
  '/resend-verification',
  [body('email').isEmail().normalizeEmail()],
  authController.resendVerification
);

/**
 * POST /api/auth/google
 * Google OAuth login
 */
router.post('/google', authController.googleAuth);

/**
 * POST /api/auth/github
 * GitHub OAuth login
 */
router.post('/github', authController.githubAuth);

module.exports = router;