const jwt = require('jsonwebtoken');
const common = require('../../constant/common');
const StatusCode = require('../../utils/StatusCode');
const message = require('../../constant/message');

class Middleware {
  verifyToken(req, res, next) {
    const headers = req.headers.authorization;
    const token = headers && headers.split(' ')[1];
    jwt.verify(token, common.common.JWT_SECRET, (err, decoded) => {
      if (err) {
        const result = {
          status: 'failed',
          message: message.Auth.unauthorize,
        };

        const statusCode = new StatusCode(result);
        return res.status(statusCode.code).json(result);
      }

      req.user = decoded;
      return next();
    });
  }
}

module.exports = Middleware;
