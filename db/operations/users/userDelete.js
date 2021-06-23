const { Connection } = require("../../connection");

async function userDelete(username) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .deleteOne({ username: username })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { userDelete };
