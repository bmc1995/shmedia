const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = new S3Client();

async function deleteObject() {
  //delete s3 object
}

module.exports = { deleteObject };
