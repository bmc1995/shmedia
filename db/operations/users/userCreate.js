const { Connection } = require("../../connection");

async function userCreate(newUserData) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .insertOne(newUserData)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { userCreate };
