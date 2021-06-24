const { UserDbOps } = require("../db/index");
const { UserServiceHelpers } = require("./helpers/index");
const { oktaUpdateUser } = require("./okta/oktaUpdateUser");
const { oktaUserById } = require("./okta/oktaUserById");

async function createUser(userIdFromEvent) {
  const userData = await oktaUserById(userIdFromEvent);
  const newUserObj = UserServiceHelpers.prepareNewUser(userData);

  return await UserDbOps.userCreate(newUserObj)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function getUserInfo(userData) {
  return await UserDbOps.userRead(userData)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function deleteUser(userData) {
  return await UserDbOps.userDelete(userData)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function updateUser(username, updates) {
  await oktaUpdateUser().catch((err) => {
    return Promise.reject(err);
  });

  return await UserDbOps.userUpdate(username, updates)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function sendFollowReq(sender_id, receiver_id) {
  return await UserDbOps.userSendFollowReq(sender_id, receiver_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function acceptFollowReq(sender_id, receiver_id) {
  return await UserDbOps.userAcceptFollowReq(sender_id, receiver_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function declineFollowReq(sender_id, receiver_id) {
  return await UserDbOps.userDeclineFollowReq(sender_id, receiver_id)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

async function unfollowUser(user, targetUser) {
  return await UserDbOps.userUnfollow(user, targetUser)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = {
  createUser,
  deleteUser,
  getUserInfo,
  updateUser,
  sendFollowReq,
  acceptFollowReq,
  declineFollowReq,
  unfollowUser,
};
