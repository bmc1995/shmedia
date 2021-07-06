const express = require("express");
const router = express.Router();

const { authRequired } = require("../middleware/authRequired");

const {
  registerNewUser,
  getUser,
  deleteUser,
  updateUser,
  userSendFollowReq,
  userAcceptFollowReq,
  userDeclineFollowReq,
  userUnfollow,
} = require("../controllers/users");

/* POST create user */
router.post("/register", registerNewUser);

//GET user information
router.get("/:username", authRequired, getUser);

//POST delete user
router.post("/delete/:username", authRequired, deleteUser);

//TODO
router.post("/edit/:username", authRequired, updateUser);

router.post("/sendFollowReq", authRequired, userSendFollowReq);

router.post("/acceptFollowReq", authRequired, userAcceptFollowReq);

router.post("/declineFollowReq", authRequired, userDeclineFollowReq);

router.post("/unfollow", authRequired, userUnfollow);

module.exports = router;
