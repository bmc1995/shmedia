const {
  UserServices,
  CommentServices,
  PostServices,
} = require("../services/index");

const registerNewUser = async (req, res, next) => {
  await UserServices.createUser(req.body.userData)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json(err.code) && next(err);
    });
};

async function getUser(req, res, next) {
  let jwt = req.jwt;
  await UserServices.getUserInfo(req.params.username)
    .then((result) => {
      res.json({ result, jwt });
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}
async function deleteUser(req, res, next) {
  await UserServices.deleteUser(req.params.username)
    .then(async (userResult) => {
      await CommentServices.deleteCommentsByUser(req.params.username).then(
        async (commentsResult) => {
          await PostServices.deletePostsByUser(req.params.username).then(
            (postResult) => {
              res.json({ userResult, commentsResult, postResult });
            }
          );
        }
      );
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}
//TODO delete all posts and comments from user.
async function updateUser(req, res, next) {
  await UserServices.updateUser(req.params.username, req.body.updates)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function userSendFollowReq(req, res, next) {
  const sender_id = req.body.userData.sender_id;
  const receiver_id = req.body.userData.receiver_id;

  await UserServices.sendFollowReq(sender_id, receiver_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function userAcceptFollowReq(req, res, next) {
  const sender_id = req.body.userData.sender_id;
  const receiver_id = req.body.userData.receiver_id;

  await UserServices.acceptFollowReq(sender_id, receiver_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function userDeclineFollowReq(req, res, next) {
  const sender_id = req.body.userData.sender_id;
  const receiver_id = req.body.userData.receiver_id;

  await UserServices.declineFollowReq(sender_id, receiver_id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function userUnfollow(req, res, next) {
  const user = req.body.userData.user;
  const targetUser = req.body.userData.targetUser;

  await UserServices.unfollowUser(user, targetUser)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

module.exports = {
  registerNewUser,
  getUser,
  deleteUser,
  updateUser,
  userSendFollowReq,
  userAcceptFollowReq,
  userDeclineFollowReq,
  userUnfollow,
};
