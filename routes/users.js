const express = require("express");
const router = express.Router();

const { authRequired } = require("../middleware/authRequired");
const multer = require("multer");

const {
  registerNewUser,
  getUser,
  getUserMulti,
  deleteUser,
  updateUser,
  userSendFollowReq,
  userAcceptFollowReq,
  userDeclineFollowReq,
  userUnfollow,
} = require("../controllers/users");
const formToReq = multer();

/* POST create user */
router.post("/register", registerNewUser);

//GET user information
router.get("/:username", authRequired, getUser);
//!!
router.get("/explore/profiles/", authRequired, getUserMulti);

//POST delete user
router.post("/delete/:username", authRequired, deleteUser);

//TODO
router.post(
  "/edit/:okta_uid",
  authRequired,
  formToReq.single("profilePic"),
  updateUser
);

router.post("/sendFollowReq", authRequired, userSendFollowReq);

router.post("/acceptFollowReq", authRequired, userAcceptFollowReq);

router.post("/declineFollowReq", authRequired, userDeclineFollowReq);

router.post("/unfollow", authRequired, userUnfollow);

module.exports = router;
