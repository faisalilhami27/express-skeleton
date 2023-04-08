module.exports = {
  common: {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    APP_ENV: process.env.APP_ENV || 'local',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
  },
};
