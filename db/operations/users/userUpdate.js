const { Connection } = require("../../connection");

//Will return the original document, instead of updated, by default.
async function userUpdate(username, updatedFields) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .findOneAndUpdate(
      { username: username },
      { $set: updatedFields },
      { returnOriginal: false }
    )
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { userUpdate };
