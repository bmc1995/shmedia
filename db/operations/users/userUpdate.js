const { oktaUpdateUser } = require("../../../services/okta/oktaUpdateUser");
const { Connection } = require("../../connection");

//Will return the original document, instead of updated, by default.
async function userUpdate(okta_uid, updatedFields, okta_id) {
  if (okta_id) {
    await oktaUpdateUser(okta_id, updatedFields).catch((err) => {
      return Promise.reject(err);
    });
  }

  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .findOneAndUpdate(
      { okta_uid: okta_uid },
      { $set: updatedFields },
      { returnOriginal: false }
    )
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      console.log(err);
      return Promise.reject(err);
    });
}

module.exports = { userUpdate };
