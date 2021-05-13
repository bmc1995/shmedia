const { commentCreate } = require("./commentCreate");
const { commentRead } = require("./commentRead");
const { commentUpdate } = require("./commentUpdate");
const { commentDelete } = require("./commentDelete");
const { commentDeleteAllByPost } = require("./commentDeleteAllByPost");

module.exports = {
  commentCreate,
  commentRead,
  commentUpdate,
  commentDelete,
  commentDeleteAllByPost,
};
