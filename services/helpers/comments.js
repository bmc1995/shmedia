function prepareNewComment(commentData) {
  return {
    user_id: commentData.user_id,
    text: commentData.text,
    post_id: commentData.post_id,
    username: commentData.username,
    parent_comnt_id: commentData.parent_comnt_id || null,
    subcomments: [],
  };
}

function populateSubcomments(comment_id, commentsArr) {
  const parentIndex = commentsArr.findIndex((e) => {
    return e._id == String(comment_id);
  });
  //move comments into parent's subcomments array.
  commentsArr.forEach((e) => {
    if (e.parent_comnt_id == String(comment_id))
      commentsArr[parentIndex].subcomments.push(e);
  });

  return commentsArr[parentIndex];
}

module.exports = {
  prepareNewComment,
  populateSubcomments,
};
