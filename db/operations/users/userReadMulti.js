const { Connection } = require("../../connection");

async function userReadMulti(params) {
  //If no parameters, return all users.
  const query = params || {};

  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .find(query)
    .toArray()
    .then(async (result) => {
      if (!result) {
        return Promise.reject("No users found.");
      }
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });

  // return user;
}
module.exports = { userReadMulti };
