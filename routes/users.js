const express = require("express");
const router = express.Router();

const { checkJwt } = require("../middleware/checkJwt");

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
router.get("/:username", getUser);

//POST delete user
router.post("/delete/:username", checkJwt, deleteUser);

//TODO
router.post("/edit/:username", checkJwt, updateUser);

router.post("/sendFollowReq", checkJwt, userSendFollowReq);

router.post("/acceptFollowReq", checkJwt, userAcceptFollowReq);

router.post("/declineFollowReq", checkJwt, userDeclineFollowReq);

router.post("/unfollow", checkJwt, userUnfollow);

module.exports = router;
