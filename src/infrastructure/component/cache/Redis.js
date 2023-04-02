const { createClient } = require('redis');
const constant = require('../../../constant/redis');

let client;
(async () => {
  client = createClient({
    url: `redis://${constant.redis.REDIS_HOST}:${constant.redis.REDIS_PORT}`,
  });

  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
})();

class Redis {
  async set(key, value, ttlInSeconds) {
    const val = value && typeof value === 'object' ? JSON.stringify(value) : value;
    const setKey = await client.set(key, val);
    if (ttlInSeconds) await client.expire(key, ttlInSeconds);
    return setKey;
  }

  async get(key) {
    const cachedData = await client.get(key);
    try {
      const parsedCachedData = JSON.parse(cachedData);
      return !parsedCachedData ? null : cachedData;
    } catch (err) {
      return cachedData;
    }
  }
}

module.exports = new Redis();
