const { userCreate } = require("./userCreate");
const { userDelete } = require("./userDelete");
const { userRead } = require("./userRead");
const { userUpdate } = require("./userUpdate");
const { userSendFollowReq } = require("./userSendFollowReq");
const { userAcceptFollowReq } = require("./userAcceptFollowReq");
const { userDeclineFollowReq } = require("./userDeclineFollowReq");

module.exports = {
  userCreate,
  userDelete,
  userRead,
  userUpdate,
  userSendFollowReq,
  userAcceptFollowReq,
  userDeclineFollowReq,
};
