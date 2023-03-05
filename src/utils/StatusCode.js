const Message = require('../constant/message');

class StatusCode {
  constructor({ success = false, message = '' }) {
    // Defined by success - boolean
    if (success === true) this.code = 200; // 200 - OK
    if (success === false) this.code = 500; // 500 - Internal Server Error

    // Defined by message - string
    if (message === Message.Common.debug) this.code = 200; // 200 - OK
    if (message === Message.Common.notFound) this.code = 404; // 404 - Not Found
    if (message === Message.Common.badRequest) this.code = 400; // 400 - Bad Request
    if (message === Message.Auth.unauthorize) this.code = 401; // 401 - Unauthorized
    if (message === Message.Auth.invalidAPIKey) this.code = 403; // 403 - Forbidden
  }
}

module.exports = StatusCode;
