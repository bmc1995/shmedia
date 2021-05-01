require("dotenv").config();
const { Connection } = require("../../connection");

async function userRead(username) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .findOne({ username: username })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });

  // return user;
}

module.exports = { userRead };
