const { MongoMemoryServer } = require("mongodb-memory-server");
const { Connection } = require("../../db/connection");

const mongoServer = new MongoMemoryServer();

/**
 * Connects MongoClient to MMS
 */
const start = async () => {
  await mongoServer.getUri().then(async (mongoURI) => {
    Connection.uri = mongoURI;
    let a = await mongoServer.getDbName()
    await Connection.open()
      .then(() => console.log(`Connected to test db at:  ${mongoURI} \n`))
      .catch((err) => {
        Promise.reject(err);
      });
      
      //create unique index on username field in users collection
      await Connection.client.db("test").collection("users").createIndex({username: 1}, {unique: true}).catch((err) => console.log(err))
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
