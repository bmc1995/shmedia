const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");

async function listUserObjects(mongoUserId) {
  const client = new S3Client();
  const command = new ListObjectsCommand({
    Bucket: "shmedia-media",
    Prefix: `users/${mongoUserId}`,
  });

  const response = await client.send(command);
  return response;
}

module.exports = { listUserObjects };
