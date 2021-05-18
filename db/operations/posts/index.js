const { postCreate } = require("./postCreate");
const { postRead } = require("./postRead");
const { postUpdate } = require("./postUpdate");
const { postDelete } = require("./postDelete");
const { postDeleteAllByUser } = require("./postDeleteAllByUser");

module.exports = {
  postCreate,
  postRead,
  postUpdate,
  postDelete,
  postDeleteAllByUser,
};
