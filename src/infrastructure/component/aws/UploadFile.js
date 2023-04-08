const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const sentry = require('@sentry/node');
const fs = require('fs');
const common = require('../../../constant/common');
const aws = require('../../../constant/aws');

class UploadFile {
  /**
   * Config file to upload to S3
   * @param file
   * @returns {{Bucket: *, Body: ReadStream, Key: string}}
   */
  #config(file) {
    return {
      Bucket: aws.aws.BUCKET_NAME,
      Body: fs.createReadStream(file.path),
      Key: `${file.originalname}`,
    };
  }

  /**
   * Send file to S3
   * @param client
   * @param params
   * @returns {Promise<void>}
   */
  async #sendToS3(client, params) {
    await client.send(new PutObjectCommand(params)).then((data) => {
      console.log(
        'Upload file to S3 successfully with requests id:',
        data.$metadata.requestId,
      );
    });
  }

  /**
   * Upload file to S3 with version v3
   * @param file
   * @returns {Promise<void>}
   */
  async uploadFileToS3V3(file) {
    try {
      const client = new S3Client({
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION,
      });

      const params = this.#config(file);
      await this.#sendToS3(client, params);
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
