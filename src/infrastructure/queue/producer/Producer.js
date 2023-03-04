const { Kafka } = require('kafkajs');
const utils = require('../../../utils/helper');
const constant = require('../../../constant/kafka');

class Producer {
  constructor() {
    this.kafka = new Kafka({
      clientId: constant.kafka.KAFKA_CLIENT_ID,
      brokers: utils.splitKafkaBroker(constant.kafka.KAFKA_BROKERS),
    });
    this.producer = this.kafka.producer();
  }

  async sendMessage(topic, message) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  }
}

module.exports = Producer;
