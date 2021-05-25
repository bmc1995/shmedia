const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

async function uploadtoS3(preparedData) {
  const client = new S3Client();
  const command = new PutObjectCommand({
    Bucket: "shmedia-media",
    Key: preparedData.key,
    Body: preparedData.Body,
  });

  const response = await client.send(command);
  return response;
}

module.exports = {
  uploadtoS3,
};
