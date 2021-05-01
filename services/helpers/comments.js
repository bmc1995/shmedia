function prepareNewComment(commentData) {
  return {
    user_id: commentData.user_id,
    text: commentData.text,
    post_id: commentData.post_id,
    username: commentData.username,
    parent_comnt_id: commentData.parent_comnt_id || null,
    subcomments: [], //subcomments populated by aggregation ($lookup)
  };
}

module.exports = {
  prepareNewComment,
};
