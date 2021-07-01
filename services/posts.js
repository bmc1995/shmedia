const { PostDbOps } = require("../db/index");
const { uploadtoS3 } = require("./aws-s3/uploadToS3");
const { PostServiceHelpers } = require("./helpers/index");

async function createPost(postData) {
  const preparedData = PostServiceHelpers.prepareS3Upload(postData);

  postData.body.media_url =
    "https://shmedia-media.s3.us-west-1.amazonaws.com/" + preparedData.Key;

  console.log(
    await uploadtoS3(preparedData).catch((err) => {
      console.log(err);
      throw err;
    })
  );

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

async function getPostsByUsers(userIdArr) {
  return await PostDbOps.postsReadByUsers(userIdArr)
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
  getPostsByUsers,
  updatePost,
  deletePost,
  deletePostsByUser,
};
