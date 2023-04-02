const Sentry = require('@sentry/node');
const Response = require('../../utils/Response');
const Message = require('../../constant/message');

class BaseUseCase {
  returnErrWithCustomMessage(message, err = null) {
    if (process.env.APP_ENV !== 'local') {
      Sentry.captureMessage(`${message} | ${err}`, {
        level: 'warning',
      });
    }
    return new Response(false, message, null, err);
  }

  returnNotFound() {
    return new Response(false, Message.Common.notFound, null, null);
  }

  returnOk(data = null) {
    return new Response(true, Message.Common.success, data, null);
  }

  returnCreated(data = null) {
    return new Response(true, Message.Common.created, data, null);
  }

  returnOkWithCustomMessage(data = null, message = null) {
    message = message ?? Message.Common.success;
    return new Response(true, message, data, null);
  }

  returnErrOnCatch(err) {
    if (process.env.APP_ENV !== 'local') {
      Sentry.captureException(err);
    }
    return new Response(false, Message.Common.generalErr, null, err);
  }
}

module.exports = BaseUseCase;
