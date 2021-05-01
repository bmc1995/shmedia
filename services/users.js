const { UserDbOps } = require("../db/index");
const { UserServiceHelpers } = require("./helpers/index");

async function createUser(userData) {
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
  return await UserDbOps.userUpdate(username, updates)
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
};
