const { Connection } = require("../../connection");

async function postCreate(postData) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .insertOne(postData)
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
module.exports = { postCreate };
