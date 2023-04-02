const { Kafka } = require('kafkajs');
const utils = require('../../../../utils/helper');
const constant = require('../../../../constant/kafka');

class Producer {
  /**
   *
   */
  constructor() {
    this.kafka = new Kafka({
      clientId: constant.kafka.KAFKA_CLIENT_ID,
      brokers: utils.splitKafkaBroker(constant.kafka.KAFKA_BROKERS),
      retry: {
        maxRetryTime: 5000,
        initialRetryTime: 3000,
        retries: parseInt(constant.kafka.KAFKA_MAX_RETRY),
        restartOnFailure: async () => true,
      },
    });
    this.producer = this.kafka.producer();
  }

  /**
   * send message to queue
   * @param topic
   * @param message
   * @returns {Promise<void>}
   */
  async sendMessage(topic, message) {
    let retries = 0;
    let delay = 100;
    const maxRetry = parseInt(constant.kafka.KAFKA_MAX_RETRY);
    await this.producer.connect();
    while (retries < maxRetry) {
      try {
        await this.producer.send({
          topic,
          messages: [{ value: JSON.stringify(message) }],
        });
      } catch (error) {
        console.log(`Error in sending message to kafka: ${error}`);
        if (retries < maxRetry) {
          retries++;
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    }
  }
}

module.exports = Producer;
