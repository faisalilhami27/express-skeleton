const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const sentry = require('@sentry/node');
const fs = require('fs');
const common = require('../../../constant/common');
const aws = require('../../../constant/aws');

class UploadFile {
  #config(file) {
    return {
      Bucket: aws.aws.BUCKET_NAME,
      Body: fs.createReadStream(file.path),
      Key: `${file.originalname}`,
    };
  }

  async uploadFileToS3V2(file) {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION,
      });

      const params = this.#config(file);
      s3.upload(params, (error, data) => {
        if (error) {
          console.log('Error: Cannot upload file to S3: ', error);
          sentry.captureException(error);
        }
        console.log('Upload file to S3 successfully with: ', data.Location);
      });
    } catch (error) {
      if (common.common.APP_ENV === 'local') {
        console.log('Error: Cannot upload file to S3: ', error);
      } else {
        sentry.captureException(error);
      }
    }
  }

  async uploadFileToS3V3(file) {
    try {
      const client = new S3Client({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION,
      });

      const params = this.#config(file);
      await client.send(new PutObjectCommand(params))
        .then((data) => {
          console.log('Upload file to S3 successfully with request id:', data.$metadata.requestId);
        });
    } catch (error) {
      if (common.common.APP_ENV === 'local') {
        console.log('Error: Cannot upload file to S3: ', error);
      } else {
        sentry.captureException(error);
      }
    }
  }
}

module.exports = UploadFile;
