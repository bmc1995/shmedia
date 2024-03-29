const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function uploadtoS3(preparedData) {
  const client = new S3Client();
  const command = new PutObjectCommand({
    Bucket: preparedData.Bucket,
    Key: preparedData.Key,
    Body: preparedData.Body,
  });

  const response = await client.send(command);
  return response;
}

module.exports = {
  uploadtoS3,
};
