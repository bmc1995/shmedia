const express = require("express");
const router = express.Router();

const {
  registerNewUser,
  getUser,
  deleteUser,
  updateUser,
  userSendFollowReq,
  userAcceptFollowReq,
  userDeclineFollowReq,
} = require("../controllers/users");

/* POST create user */
router.post("/register", registerNewUser);

//GET user information
router.get("/:username", getUser);

//POST delete user
router.post("/delete/:username", deleteUser);

//TODO
router.post("/edit/:username", updateUser);

router.post("/sendFollowReq", userSendFollowReq);

router.post("/acceptFollowReq", userAcceptFollowReq);

router.post("/declineFollowReq", userDeclineFollowReq);

module.exports = router;
