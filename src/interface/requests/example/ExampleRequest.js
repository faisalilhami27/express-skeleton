const BaseRequest = require('../BaseRequest');

class ExampleRequest extends BaseRequest {
  rules(body) {
    const schema = {
      name: 'string|required|regex:/^[a-zA-Z ]+$/|min:3|max:100',
      username: 'string|required|min:3|max:20',
      password: 'string|required|min:6|max:20|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\\\d).+$/',
    };

    return this.validate(body, schema);
  }
}

module.exports = ExampleRequest;
