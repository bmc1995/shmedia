const { S3Client, ListObjectsCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client();

async function listObjects() {
  //list objects within bucket
}

module.exports = { listObjects };
