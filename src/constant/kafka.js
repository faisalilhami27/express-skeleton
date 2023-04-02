module.exports = {
  kafka: {
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID || 'queue-client',
    KAFKA_BROKERS: process.env.KAFKA_BROKERS || 'localhost:9092',
    KAFKA_TOPIC: process.env.KAFKA_TOPIC || 'queue-topic',
    KAFKA_MAX_RETRY_TIME: process.env.KAFKA_MAX_RETRY_TIME || 5000,
    KAFKA_MAX_RETRY: process.env.KAFKA_MAX_RETRY || 3,
    KAFKA_INITIAL_RETRY_TIME: process.env.KAFKA_INITIAL_RETRY_TIME || 3000,
  },
};
