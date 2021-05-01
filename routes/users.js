const express = require("express");
const router = express.Router();

const {
  registerNewUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

/* POST create user */
router.post("/register", registerNewUser);

//GET user information
router.get("/:username", getUser);

//POST delete user
router.post("/delete/:username", deleteUser);

//TODO
router.post("/edit/:username", updateUser);

module.exports = router;
