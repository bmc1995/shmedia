const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

async function deleteObject(key) {
  //delete s3 object
  const client = new S3Client();
  const command = new DeleteObjectCommand({
    Bucket: "shmedia-media",
    Key: key,
  });

  const response = await client.send(command);
  return response;
}

module.exports = { deleteObject };
