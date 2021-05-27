const fs = require("fs");
const { determineFileFormat } = require("../../utils/determineFileFormat");

function prepareNewPost(postData) {
  return {
    user_id: postData.user_id,
    username: postData.username,
    profilePic_url: postData.profilePic_url || "",
    video: postData.video,
    comments: [], //comments populated by aggregation ($lookup)
    media_url: postData.media_url,
    caption: postData.caption || "",
  };
}

function prepareS3Upload(postData, file) {
  const mediaType = postData.video ? "videos" : "images";

  const binaryData = fs.readFileSync(file);

  const fExtension = determineFileFormat(binaryData, postData.video);

  const preparedData = {
    Bucket: "shmedia-media",
    Key: `users/${postData.user_id}/${mediaType}/${Date.now()}` + fExtension,
    Body: binaryData,
  };

  return preparedData;
}

module.exports = {
  prepareNewPost,
  prepareS3Upload,
};
