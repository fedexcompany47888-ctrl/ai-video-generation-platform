/**
 * Stripe Payment Configuration
 */

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('./logger');

/**
 * Create Stripe customer
 * @param {Object} userData - User data
 * @returns {Promise} Stripe customer object
 */
const createCustomer = async (userData) => {
  try {
    const customer = await stripe.customers.create({
      email: userData.email,
      name: userData.name,
      description: `User: ${userData._id}`,
      metadata: {
        userId: userData._id.toString(),
      },
    });
    logger.info(`Stripe customer created: ${customer.id}`);
    return customer;
  } catch (error) {
    logger.error('Error creating Stripe customer:', error);
    throw error;
  }
};

/**
 * Create payment intent
 * @param {number} amount - Amount in cents
 * @param {string} currency - Currency code
 * @param {string} customerId - Stripe customer ID
 * @returns {Promise} Payment intent object
 */
const createPaymentIntent = async (amount, currency = 'usd', customerId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    logger.info(`Payment intent created: ${paymentIntent.id}`);
    return paymentIntent;
  } catch (error) {
    logger.error('Error creating payment intent:', error);
    throw error;
  }
};

/**
 * Create subscription
 * @param {string} customerId - Stripe customer ID
 * @param {string} priceId - Stripe price ID
 * @returns {Promise} Subscription object
 */
const createSubscription = async (customerId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    logger.info(`Subscription created: ${subscription.id}`);
    return subscription;
  } catch (error) {
    logger.error('Error creating subscription:', error);
    throw error;
  }
};

/**
 * Cancel subscription
 * @param {string} subscriptionId - Stripe subscription ID
 * @returns {Promise} Cancelled subscription
 */
const cancelSubscription = async (subscriptionId) => {
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId);
    logger.info(`Subscription cancelled: ${subscriptionId}`);
    return subscription;
  } catch (error) {
    logger.error('Error cancelling subscription:', error);
    throw error;
  }
};

/**
 * Verify webhook signature
 * @param {string} body - Request body
 * @param {string} signature - Stripe signature header
 * @returns {Object} Event object
 */
const verifyWebhookSignature = (body, signature) => {
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    logger.info(`Webhook verified: ${event.type}`);
    return event;
  } catch (error) {
    logger.error('Webhook signature verification error:', error);
    throw error;
  }
};

module.exports = {
  stripe,
  createCustomer,
  createPaymentIntent,
  createSubscription,
  cancelSubscription,
  verifyWebhookSignature,
};