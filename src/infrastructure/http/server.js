const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const sentryConfig = require('../../constant/sentry');

// import routes
const healthRouter = require('./routes/health/health');

// check environment
require('../../config/environment')();

class Server {
  constructor() {
    this.plugin();
  }

  plugin() {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json({ limit: '10mb' }));
    app.use(logger('dev'));
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static('static'));

    if (process.env.APP_ENV !== 'local') {
      Sentry.init({
        dsn: sentryConfig.sentry.SENTRY_DSN,
        environment: sentryConfig.sentry.SENTRY_ENVIRONMENT,
        integrations: [
          new Sentry.Integrations.Http({ tracing: true }),
          new Tracing.Integrations.Express({ app }),
          new Tracing.Integrations.Mysql(),
          new Tracing.Integrations.Mongo({ useMongoose: true }),
        ],
      });
      app.use(Sentry.Handlers.requestHandler());
      app.use(Sentry.Handlers.tracingHandler());
    }
  }

  start() {
    app.use('/health', healthRouter);
    app.use('/', (req, res) => {
      res.send('Welcome to the API');
    });
  }
}

module.exports = {
  app,
  Server,
};
