require("dotenv").config();
const { Connection } = require("../../connection");

async function userSendFollowReq(sender_id, receiver_id) {
  return await Connection.client
    .db(process.env.MONGO_DB)
    .collection("users")
    .bulkWrite([
      {
        updateOne: {
          filter: { username: sender_id },
          update: { $addToSet: { "followers.pendOut": receiver_id } },
        },
      },
      {
        updateOne: {
          filter: { username: receiver_id },
          update: { $addToSet: { "followers.pendIn": sender_id } },
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

module.exports = { userSendFollowReq };
