const { Connection } = require("../../connection");

async function userUnfollow(user, targetUser) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .updateOne(
      { username: user },
      { $pull: { "followers.current": targetUser } }
    )
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { userUnfollow };
