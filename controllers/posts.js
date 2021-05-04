const { ObjectId } = require("bson");
const { PostServices } = require("../services/index");

const createPost = async (req, res, next) => {
  await PostServices.createPost(req.body.postData)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      //TODO add error handling middleware
      res.sendStatus(500) && next(err);
    });
};

async function getPost(req, res, next) {
  //need to turn post_id into an ObjectId for mongodb to recognize in search (string on client-side)
  const post_id = ObjectId(req.params.post_id);
  await PostServices.getPost(post_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}
async function deletePost(req, res, next) {
  const post_id = ObjectId(req.params.post_id);
  await PostServices.deletePost(post_id)
    .then((result) => {
      res.json(result);
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

module.exports = { createPost, getPost, updatePost, deletePost };
