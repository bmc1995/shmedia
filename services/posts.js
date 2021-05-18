const { PostDbOps } = require("../db/index");
const { PostServiceHelpers } = require("./helpers/index");

async function createPost(postData) {
  const newPost = PostServiceHelpers.prepareNewPost(postData);

  return await PostDbOps.postCreate(newPost)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function getPost(post_id) {
  return await PostDbOps.postRead(post_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function updatePost(post_id, updates) {
  return await PostDbOps.postUpdate(post_id, updates)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function deletePost(post_id) {
  return await PostDbOps.postDelete(post_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function deletePostsByUser(username) {
  return await PostDbOps.postDeleteAllByUser(username)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  deletePostsByUser,
};
