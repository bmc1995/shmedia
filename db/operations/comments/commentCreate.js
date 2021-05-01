require("dotenv").config();
const { Connection } = require("../../connection");

async function commentCreate(commentData) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("comments")
    .insertOne(commentData)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { commentCreate };
