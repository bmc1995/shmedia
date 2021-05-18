const { CommentDbOps } = require("../db/index");
const { populateSubcomments } = require("./helpers/comments");
const { CommentServiceHelpers } = require("./helpers/index");

async function createComment(commentData) {
  const newCommentObj = CommentServiceHelpers.prepareNewComment(commentData);

  return await CommentDbOps.commentCreate(newCommentObj)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function getComment(comment_id) {
  return await CommentDbOps.commentRead(comment_id)
    .then((result) => {
      const comment = populateSubcomments(comment_id, result);
      return Promise.resolve(comment);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function updateComment(comment_id, updatedFields) {
  return await CommentDbOps.commentUpdate(comment_id, updatedFields)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function deleteComment(comment_id) {
  return await CommentDbOps.commentDelete(comment_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function deleteCommentsByPost(post_id) {
  return await CommentDbOps.commentDeleteAllByPost(post_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function deleteCommentsByUser(username) {
  return await CommentDbOps.commentDeleteAllByUser(username)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
  deleteCommentsByPost,
  deleteCommentsByUser,
};
