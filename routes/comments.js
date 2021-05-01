const express = require("express");
const router = express.Router();

const { createComment, getComment } = require("../controllers/comments");

/* POST create comment */
router.post("/create", createComment);

//GET comment by comment id
router.get("/:comment_id", getComment);

// // POST update post
// router.post("/edit/:post_id", updatePost);

// // POST delete post
// router.post("/delete/:post_id", deletePost);

module.exports = router;
