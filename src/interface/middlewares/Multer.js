const multer = require('multer');

const storage = multer.diskStorage({
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

class Multer {
  upload = () => multer({ storage, limits: { fileSize: 100000000 } });
}

module.exports = Multer;
