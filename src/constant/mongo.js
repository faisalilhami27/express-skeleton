module.exports = {
  mongo: {
    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_USER: process.env.MONGO_USER || 'admin',
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || 'admin123',
    MONGO_PORT: process.env.MONGO_PORT || 5000,
    MONGO_DB: process.env.MONGO_DB || 'test',
  }
}
