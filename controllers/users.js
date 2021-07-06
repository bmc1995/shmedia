const {
  UserServices,
  CommentServices,
  PostServices,
} = require("../services/index");
const { oktaUpdateUser } = require("../services/okta/oktaUpdateUser");
const OktaService = require("../services/okta/oktaUserById");

async function registerNewUser(req, res, next) {
  const userIdFromEvent = req.body.data.events[0]["target"][0].id;

  await OktaService.oktaUserById(userIdFromEvent)
    .then(async (oktaUser) => {
      await UserServices.createUser(oktaUser).then((mongoResult) => {
        res.status(201).json(mongoResult);
      });
    })
    .catch((err) => {
      res.status(500).json(err.code) && next(err);
    });
}
//need to get posts? limit to 10, getMore when needed?
async function getUser(req, res, next) {
  await UserServices.getUserInfo(req.params.username)
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
      //refactor error handling
      err == "User not found"
        ? res.sendStatus(404)
        : res.sendStatus(500) && next(err);
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
// refactor to use oktaId for both.
async function updateUser(req, res, next) {
  await UserServices.updateUser(req.params.username, req.body.updates)
    .then(async (mongoResult) => {
      await oktaUpdateUser(req.params.oktaId, req.body.updates).then(
        (oktaResult) => {
          res.json({ mongoResult, oktaResult });
        }
      );
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
