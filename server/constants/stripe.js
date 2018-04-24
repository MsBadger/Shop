const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_live_5r1Lgzv6Dd1MzpaPRkmU8qva'
    : 'sk_test_5r1Lgzv6Dd1MzpaPRkmU8qva';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;