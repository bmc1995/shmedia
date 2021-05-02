const { ObjectId } = require("bson");
const { CommentServices } = require("../services/index");

const createComment = async (req, res, next) => {
  await CommentServices.createComment(req.body.commentData)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
};

const getComment = async (req, res, next) => {
  const comment_id = ObjectId(req.params.comment_id);
  await CommentServices.getComment(comment_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
};

const updateComment = async (req, res, next) => {
  const comment_id = ObjectId(req.params.comment_id);
  await CommentServices.updateComment(comment_id, req.body.updates)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
};

async function deleteComment(req, res, next) {
  //need to turn comment_id into an ObjectId for mongodb to recognize in search
  const comment_id = ObjectId(req.params.comment_id);
  await CommentServices.deleteComment(comment_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

module.exports = {
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
