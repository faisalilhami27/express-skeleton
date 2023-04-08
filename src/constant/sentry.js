module.exports = {
  sentry: {
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_ENVIRONMENT: process.env.SENTRY_ENVIRONMENT || 'development',
  },
};
