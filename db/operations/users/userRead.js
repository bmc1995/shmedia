const { Connection } = require("../../connection");

async function userRead(okta_uid) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .findOne({ okta_uid: okta_uid })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });

  // return user;
}

module.exports = { userRead };
