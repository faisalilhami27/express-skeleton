const AWS = require('aws-sdk');
const sentry = require('@sentry/node');
const multer = require('multer');
const multerS3 = require('multer-s3');
const common = require('../../../constant/common');

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

class UploadFile {
  constructor() {
    AWS.config.update({
      region: process.env.BUCKET_NAME,
    });
  }

  async uploadFileToS3() {
    try {
      multer({
        storage: multerS3({
          s3,
          bucket: process.env.BUCKET_NAME,
          key(req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
          },
        }),
      });
      console.log('Upload file to S3 successfully');
    } catch (error) {
      if (common.common.APP_ENV !== 'local') {
        sentry.captureException(error);
      } else {
        console.log('Error: Cannot upload file to S3');
        console.log(error);
      }
    }
  }
}

module.exports = new UploadFile().uploadFileToS3();
