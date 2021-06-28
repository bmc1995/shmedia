const { postCreate } = require("./postCreate");
const { postRead } = require("./postRead");
const { postsReadByUsers } = require("./postsReadByUser");
const { postUpdate } = require("./postUpdate");
const { postDelete } = require("./postDelete");
const { postDeleteAllByUser } = require("./postDeleteAllByUser");

module.exports = {
  postCreate,
  postRead,
  postsReadByUsers,
  postUpdate,
  postDelete,
  postDeleteAllByUser,
};
