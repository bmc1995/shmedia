const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");

/* POST create user */
router.post("/create", createPost);

//GET posts by user id
router.get("/:post_id", getPost);

// POST update post
router.post("/edit/:post_id", updatePost);

// POST delete post
router.post("/delete/:post_id", deletePost);

module.exports = router;
