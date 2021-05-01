require("dotenv").config();
const { Connection } = require("../../connection");

async function postDelete(post_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .findOneAndDelete({ _id: post_id })
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { postDelete };
