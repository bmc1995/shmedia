const { Connection } = require("../../connection");

async function userDeclineFollowReq(sender_id, receiver_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .bulkWrite([
      // { deleteOne: { filter: { username: sender_id } } },
      // { deleteOne: { filter: { username: receiver_id } } },
      {
        updateOne: {
          filter: { username: sender_id },
          update: {
            $pull: { "followers.pendOut": receiver_id },
          },
        },
      },
      {
        updateOne: {
          filter: { username: receiver_id },
          update: {
            $pull: { "followers.pendIn": sender_id },
          },
        },
      },
    ])
    .then((result) => {
      return Promise.resolve(result);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

module.exports = { userDeclineFollowReq };
