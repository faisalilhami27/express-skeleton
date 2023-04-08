const constants = require('../../constant/database');

module.exports = {
  development: {
    username: constants.db.DB_USERNAME,
    password: constants.db.DB_PASSWORD,
    database: constants.db.DB_NAME,
    host: constants.db.DB_HOST,
    dialect: constants.db.DB_DIALECT,
    timezone: '+07:00',
  },
  test: {
    username: constants.db.DB_USERNAME,
    password: constants.db.DB_PASSWORD,
    database: constants.db.DB_NAME,
    host: constants.db.DB_HOST,
    dialect: constants.db.DB_DIALECT,
    timezone: '+07:00',
  },
  production: {
    username: constants.db.DB_USERNAME,
    password: constants.db.DB_PASSWORD,
    database: constants.db.DB_NAME,
    host: constants.db.DB_HOST,
    dialect: constants.db.DB_DIALECT,
    timezone: '+07:00',
  },
};
