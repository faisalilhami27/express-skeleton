const Validator = require('validatorjs');

class BaseRequest {
  validate(body, schema) {
    return new Validator(body, schema);
  }
}

module.exports = BaseRequest;
