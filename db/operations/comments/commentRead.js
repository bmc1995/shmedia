require("dotenv").config();
const { Connection } = require("../../connection");

async function commentRead(comment_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("comments")
    .find({
      $or: [{ _id: comment_id }, { parent_comnt_id: String(comment_id) }],
    })
    .toArray()
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { commentRead };
