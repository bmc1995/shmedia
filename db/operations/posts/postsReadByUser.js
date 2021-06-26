const { Connection } = require("../../connection");

/**
 *
 * Fetch post documents in which the user_id field matches an element in `idList`.
 * @param {ObjectId[]} idList
 */

async function postsByUserId(idList) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .find({ _id: { $in: idList } })
    .toArray()
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { postsByUserId };
