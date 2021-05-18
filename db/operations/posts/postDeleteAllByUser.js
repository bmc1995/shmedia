require("dotenv").config();
const { Connection } = require("../../connection");

async function postDeleteAllByUser(username) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .deleteMany({ username: username })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { postDeleteAllByUser };
