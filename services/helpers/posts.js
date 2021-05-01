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

module.exports = {
  prepareNewPost,
};
