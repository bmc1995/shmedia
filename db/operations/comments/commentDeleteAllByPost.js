const { Connection } = require("../../connection");

async function commentDeleteAllByPost(post_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("comments")
    .deleteMany({ post_id: String(post_id) })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { commentDeleteAllByPost };
