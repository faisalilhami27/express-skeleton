const multer = require('multer');

class Multer {
  upload = () => multer({ limits: { fileSize: 8000000 } });
}

module.exports = Multer;
