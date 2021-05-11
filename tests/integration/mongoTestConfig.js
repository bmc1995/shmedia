const { MongoMemoryServer } = require("mongodb-memory-server");
const { Connection } = require("../../db/connection");

const userData = {
  user1: {
    first_name: "TESTuser1",
    last_name: "TESTmcc",
    username: "TESTuser1",
    birthdate: new Date("10/22/1995").toISOString(),
    location: {
      country: "United States",
    },
    followers: {
      pendIn: [],
      pendOut: [],
      current: [],
    },
  },
  user2: {
    first_name: "TESTuser2",
    last_name: "TESTmcc",
    username: "TESTuser2",
    birthdate: new Date("10/22/1995").toISOString(),
    location: {
      country: "United States",
    },
    followers: {
      pendIn: [],
      pendOut: [],
      current: [],
    },
  },
};

const mongoServer = new MongoMemoryServer();

/**
 * Connects MongoClient to MMS
 */
const start = async () => {
  await mongoServer.getUri().then(async (mongoURI) => {
    Connection.uri = mongoURI;
    await Connection.open()
      .then(() => console.log(`Connected to test db at:  ${mongoURI} \n`))
      .catch((err) => {
        Promise.reject(err);
      });

    //create unique index on username field in users collection
    await Connection.client
      .db("test")
      .collection("users")
      .createIndex({ username: 1 }, { unique: true })
      .catch((err) => console.log(err));
    //create index on parent comnt id; queries look through parent id fields containing object id's
    await Connection.client
      .db("test")
      .collection("comments")
      .createIndex(
        { parent_comnt_id: 1 },
        { partialFilterExpression: { parent_comnt_id: { $type: "objectId" } } }
      );
    //populate users
    await Connection.client
      .db("test")
      .collection("users")
      .insertMany([userData.user1, userData.user2])
      .catch((err) => {
        console.log(err);
      });
  });
};

/**
 * Closes MongoClient connection and stops MMS
 */
const stop = async () => {
  await Connection.client.close();
  await mongoServer.stop();
};

module.exports = {
  start,
  stop,
};
