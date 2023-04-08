const express = require('express');

const router = express.Router();

const ExampleController = require('../../../../interface/controllers/example/ExampleController');
const Multer = require('../../../../interface/middlewares/Multer');
const VerifyToken = require('../../../../interface/middlewares/Middleware');

const middleware = new VerifyToken();
const exampleController = new ExampleController();
const multer = new Multer();

// example using middleware verify token with jwt
router.get(
  '/',
  middleware.verifyToken,
  exampleController.methodName,
);

// upload file example with multer
router.post(
  '/',
  middleware.verifyToken,
  multer.upload().single('photo'),
  exampleController.methodName,
);

module.exports = router;
