const { ObjectId } = require("bson");
const { deleteObject } = require("../services/aws-s3/deleteObject");
const { PostServices, CommentServices } = require("../services/index");

const createPost = async (req, res, next) => {
  console.log({ file: req.file, body: req.body });
  await PostServices.createPost({ file: req.file, body: req.body })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      //TODO add error handling middleware
      res.sendStatus(500) && next(err);
    });
};

async function getPost(req, res, next) {
  //need to turn post_id into an ObjectId for mongodb to recognize in search (is string on client-side)
  //make a seperate route for explore
  let post_id;

  //refactor t/c block to util
  try {
    post_id =
      req.params.post_id == "explore"
        ? req.params.post_id
        : ObjectId(req.params.post_id);
  } catch (err) {
    res.sendStatus(500);
    return next(err);
  }

  await PostServices.getPost(post_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function getPostsByUsers(req, res, next) {
  console.log(req.body);
  const userIdArr = req.body.userIdArr.map((element) => {
    return element;
  });
  await PostServices.getPostsByUsers(userIdArr)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function deletePost(req, res, next) {
  const post_id = ObjectId(req.params.post_id);
  const key = req.body.media_url.split("amazonaws.com")[1];

  await deleteObject(key)
    .then(async (s3Result) => {
      await CommentServices.deleteCommentsByPost(post_id).then(
        async (commentResult) => {
          await PostServices.deletePost(post_id)
            .then((postResult) => {
              res.json({ s3Result, postResult, commentResult });
            })
            .catch((err) => {
              res.sendStatus(500) && next(err);
            });
        }
      );
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function updatePost(req, res, next) {
  const post_id = ObjectId(req.params.post_id);
  await PostServices.updatePost(post_id, req.body.updates)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

module.exports = {
  createPost,
  getPost,
  getPostsByUsers,
  updatePost,
  deletePost,
};
