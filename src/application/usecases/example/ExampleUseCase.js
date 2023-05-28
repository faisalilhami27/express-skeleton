const BaseUseCase = require('../BaseUseCase');
const ExampleRequest = require('../../../interface/requests/example/ExampleRequest');

class ExampleUseCase extends BaseUseCase {
  constructor() {
    super();
    this.request = new ExampleRequest();
  }

  /**
   * example use case method
   * use if you want to validate request body
   * @returns {Promise<Response>}
   */
  async methodName() {
    const validate = await this.request.rules(this.req.body);

    if (validate.fails()) {
      return this.returnErrValidation(validate.errors.errors);
    }

    // your code here
    return this.returnOk();
  }
}

module.exports = ExampleUseCase;
