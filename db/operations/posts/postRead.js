const { Connection } = require("../../connection");

async function postRead(post_id) {
  //make a seperate route for explore
  let query = post_id == "explore" ? {} : { _id: post_id };

  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("posts")
    .find(query)
    .toArray()
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { postRead };
