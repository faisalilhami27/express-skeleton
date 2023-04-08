const ExampleUseCase = require('../../../application/usecases/example/ExampleUseCase');
const BaseController = require('../BaseController');
const StatusCode = require('../../../utils/StatusCode');

class ExampleController extends BaseController {
  async methodName(req, res) {
    const result = await new ExampleUseCase(req).methodName();
    const statusCode = new StatusCode(result);
    return res.status(statusCode.code).json(result);
  }
}

module.exports = ExampleController;
