require("dotenv").config();
const { Connection } = require("../../connection");

async function commentDelete(comment_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("comments")
    .deleteMany({
      $or: [{ _id: comment_id }, { parent_comnt_id: String(comment_id) }],
    })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { commentDelete };
