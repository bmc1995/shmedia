const { Connection } = require("../../connection");

//Will return the original document, instead of updated, by default.
async function postUpdate(post_id, updatedFields) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .findOneAndUpdate(
      { _id: post_id },
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

module.exports = { postUpdate };
