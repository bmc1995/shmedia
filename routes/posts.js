const express = require("express");
const router = express.Router();

const {
  createPost,
  getPost,
  getPostsByUsers,
  updatePost,
  deletePost,
} = require("../controllers/posts");

/* POST create user */
router.post("/create", createPost);

//GET by post id
router.get("/:post_id", getPost);

// POST posts by user id('s)
router.post("/byUsers", getPostsByUsers);

//GET all public posts (explore page?)
// router.get("/explore", getPublicPosts);

// POST update post
router.post("/edit/:post_id", updatePost);

// POST delete post
router.post("/delete/:post_id", deletePost);

module.exports = router;
