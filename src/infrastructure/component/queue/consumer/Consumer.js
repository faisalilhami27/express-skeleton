const { Kafka } = require('kafkajs');
const utils = require('../../../../utils/helper');
const constant = require('../../../../constant/kafka');

class Consumer {
  /**
   * constructor
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
    this.consumer = this.kafka.consumer({
      groupId: constant.kafka.KAFKA_CLIENT_ID,
    });
  }

  /**
   * process message and show result message from queue
   * @param message
   * @param callback
   * @returns {Promise<void>}
   */
  async processMessage(message, callback) {
    try {
      callback(message);
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      this.consumer.pause();
      setTimeout(() => {
        this.consumer.resume();
      }, 3000);
      throw error;
    }
  }

  /**
   * consume message from queue
   * @param topic
   * @param callback
   * @returns {Promise<void>}
   */
  async consumeMessage(topic, callback) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic });
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          await this.processMessage(message, callback);
          await this.consumer.commitOffsets([
            { topic, partition, offset: message.offset },
          ]);
        } catch (error) {
          console.error(error);
        }
      },
    });
  }
}

module.exports = Consumer;
