const { Connection } = require("../../connection");

async function userRead(findBy, value) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .findOne(findBy == "name" ? { username: value } : { okta_uid: value })
    .then(async (result) => {
      if (!result) {
        return Promise.reject("User not found");
      }
      //get followers
      await Connection.client
        .db(process.env.MONGO_DB)
        .collection("users")
        .find({ "followers.current": { $in: [result._id] } })
        .toArray()
        .then((followingResult) => {
          result.following = followingResult;
        });
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });

  // return user;
}

module.exports = { userRead };
