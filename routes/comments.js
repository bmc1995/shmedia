const express = require("express");
const router = express.Router();

const {
  createComment,
  getComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

/* POST create comment */
router.post("/create", createComment);

//GET comment by id
router.get("/:comment_id", getComment);

// POST update comment by id
router.post("/edit/:comment_id", updateComment);

// POST delete comment by id
router.post("/delete/:comment_id", deleteComment);

module.exports = router;
