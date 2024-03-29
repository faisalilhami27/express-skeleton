require('dotenv').config();

const createValidator = () => {
  const accumulator = [];
  return {
    assertEnv: (key) => {
      if (typeof process.env[key] !== 'string') {
        accumulator.push(key);
      }
    },
    validate: () => {
      if (accumulator.length === 0) {
        return;
      }
      console.log(`missing environment ${accumulator} in ${__filename}`);
      process.exit();
    },
  };
};
// Check required environment
module.exports = () => {
  const { assertEnv, validate } = createValidator();
  assertEnv('PORT');
  assertEnv('NODE_ENV');
  assertEnv('APP_ENV');
  assertEnv('KAFKA_BROKERS');
  assertEnv('KAFKA_CLIENT_ID');
  assertEnv('KAFKA_TOPIC');
  assertEnv('KAFKA_MAX_RETRY');
  assertEnv('KAFKA_MAX_RETRY_TIME');
  assertEnv('KAFKA_INITIAL_RETRY_TIME');
  assertEnv('REDIS_PORT');
  assertEnv('REDIS_HOST');
  assertEnv('SENTRY_DSN');
  assertEnv('SENTRY_ENVIRONMENT');
  assertEnv('ACCESS_CLIENT_ID');
  assertEnv('SECRET_ACCESS_KEY');
  assertEnv('REGION');
  assertEnv('BUCKET_NAME');
  assertEnv('JWT_SECRET');
  validate();
  return true;
};
