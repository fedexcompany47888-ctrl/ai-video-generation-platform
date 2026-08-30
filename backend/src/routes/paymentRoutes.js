/**
 * Payment Routes
 * Handles payment and subscription management
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/payments/webhook/stripe
 * Stripe webhook endpoint (no auth required)
 */
router.post(
  '/webhook/stripe',
  express.raw({ type: 'application/json' }),
  paymentController.stripeWebhook
);

// All other payment routes require authentication
router.use(verifyToken);

/**
 * GET /api/payments/plans
 * Get available subscription plans
 */
router.get('/plans', paymentController.getPlans);

/**
 * POST /api/payments/subscribe
 * Subscribe to a plan
 */
router.post(
  '/subscribe',
  [body('priceId').exists()],
  paymentController.subscribe
);

/**
 * POST /api/payments/cancel
 * Cancel subscription
 */
router.post('/cancel', paymentController.cancelSubscription);

/**
 * GET /api/payments/invoices
 * Get user invoices
 */
router.get('/invoices', paymentController.getInvoices);

/**
 * POST /api/payments/payment-method
 * Save payment method
 */
router.post(
  '/payment-method',
  [body('paymentMethodId').exists()],
  paymentController.savePaymentMethod
);

/**
 * GET /api/payments/payment-methods
 * Get saved payment methods
 */
router.get('/payment-methods', paymentController.getPaymentMethods);

/**
 * POST /api/payments/create-payment-intent
 * Create payment intent for custom amount
 */
router.post(
  '/create-payment-intent',
  [body('amount').isInt({ min: 1 })],
  paymentController.createPaymentIntent
);

module.exports = router;