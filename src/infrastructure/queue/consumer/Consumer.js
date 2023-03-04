const {Kafka} = require('kafkajs');
const utils = require('../../../utils/helper');
const constant = require('../../../constant/kafka');

class Consumer {
  constructor() {
    this.kafka = new Kafka({
      clientId: constant.kafka.KAFKA_CLIENT_ID,
      brokers: utils.splitKafkaBroker(constant.kafka.KAFKA_BROKERS),
      retry: {
        maxRetryTime: 5000,
        initialRetryTime: 3000,
        retries: 3,
        restartOnFailure: async () => true
      }
    });
    this.consumer = this.kafka.consumer({groupId: constant.kafka.KAFKA_CLIENT_ID});
  }

  async consumeMessage(topic, callback) {
    await this.consumer.connect();
    await this.consumer.subscribe({topic});
    await this.consumer.run({
      eachMessage: async ({message}) => {
        callback(message);
      },
    });
  }
}

module.exports = Consumer;
