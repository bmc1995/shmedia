const fs = require("fs");
const { Readable } = require("stream");
function prepareNewPost(postData) {
  console.log("prepnew");

  return {
    okta_uid: postData.body.okta_uid,
    video: postData.body.video,
    comments: [], //comments populated by aggregation ($lookup)
    media_url: postData.body.media_url || null,
    caption: postData.body.caption || "",
  };
}

function prepareS3Upload(postData) {
  console.log(postData.body.video);
  const mediaType = postData.body.video == "true" ? "videos" : "images";
  const binaryData = postData.file.buffer;

  const preparedData = {
    Bucket: "shmedia-media",
    Key: `users/${postData.body.okta_uid}/${mediaType}/${Date.now()}_${
      postData.file.originalname
    }`,
    Body: binaryData,
  };
  console.log(preparedData);
  return preparedData;
}

module.exports = {
  prepareNewPost,
  prepareS3Upload,
};
