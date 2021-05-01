require("dotenv").config();
const { Connection } = require("../../connection");

async function postRead(post_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .find({ _id: post_id })
    .toArray()
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { postRead };
