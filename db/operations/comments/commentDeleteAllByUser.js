const { Connection } = require("../../connection");

async function commentDeleteAllByUser(username) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("comments")
    .deleteMany({ username: username })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { commentDeleteAllByUser };
