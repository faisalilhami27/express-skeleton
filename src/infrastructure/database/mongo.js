const mongoose = require('mongoose');
const constants = require('../../constant/mongo');

const config = {
  host: constants.mongo.MONGO_HOST,
  username: constants.mongo.MONGO_USER,
  password: constants.mongo.MONGO_PASSWORD,
  port: constants.mongo.MONGO_PORT,
  db_name: constants.mongo.MONGO_DB,
}

module.exports = (app) => {
  let connectUri = '';
  if (config.username && config.password) {
    connectUri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.db_name}`;
  } else {
    connectUri = `mongodb://${config.host}:${config.port}/${config.db_name}`;
  }
  mongoose.connect(connectUri, {
    useNewUrlParser: true,
  });
  mongoose.Promise = global.Promise;

  checkConnection();

  process.on('SIGINT', cleanUp);
  process.on('SIGTERM', cleanUp);
  process.on('SIGHUP', cleanUp);

  if (app) {
    app.set('mongoose', mongoose);
  }
}

function checkConnection() {
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('error', (err) => {
    console.log(err)
    process.exit(1)
  })
  db.once('open', () => {
    console.log(
      `Connected to MongoDB ${config.username}:${config.password}@${
        config.host
      }:${config.port}/${config.db_name} at: ${new Date()}`
    )
  })
}

function cleanUp() {
  mongoose.connection.close(() => {
    process.exit(0)
  })
}
