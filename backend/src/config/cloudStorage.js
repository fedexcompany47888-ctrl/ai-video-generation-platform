/**
 * Cloud Storage Configuration
 * Handles AWS S3 or similar cloud storage services
 */

const AWS = require('aws-sdk');
const logger = require('./logger');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - File buffer to upload
 * @param {string} fileName - Name of the file
 * @param {string} folder - S3 folder path
 * @returns {Promise} S3 upload result
 */
const uploadToS3 = async (fileBuffer, fileName, folder = 'uploads') => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${folder}/${Date.now()}-${fileName}`,
      Body: fileBuffer,
      ContentType: 'application/octet-stream',
      ServerSideEncryption: 'AES256',
    };

    const data = await s3.upload(params).promise();
    logger.info(`File uploaded to S3: ${data.Location}`);
    return data;
  } catch (error) {
    logger.error('S3 upload error:', error);
    throw error;
  }
};

/**
 * Delete file from S3
 * @param {string} fileKey - S3 file key
 * @returns {Promise} Delete result
 */
const deleteFromS3 = async (fileKey) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
    };

    await s3.deleteObject(params).promise();
    logger.info(`File deleted from S3: ${fileKey}`);
  } catch (error) {
    logger.error('S3 delete error:', error);
    throw error;
  }
};

/**
 * Get signed URL for S3 object
 * @param {string} fileKey - S3 file key
 * @param {number} expiresIn - URL expiration in seconds
 * @returns {string} Signed URL
 */
const getSignedUrl = (fileKey, expiresIn = 3600) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Expires: expiresIn,
    };

    const url = s3.getSignedUrl('getObject', params);
    return url;
  } catch (error) {
    logger.error('Error getting signed URL:', error);
    throw error;
  }
};

module.exports = {
  uploadToS3,
  deleteFromS3,
  getSignedUrl,
};