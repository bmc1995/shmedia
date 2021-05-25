const { S3Client, CreateBucketCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client();

async function createBucket() {
  //create s3 bucket
}

module.exports = { createBucket };
