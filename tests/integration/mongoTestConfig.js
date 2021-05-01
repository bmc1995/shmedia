const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { Connection } = require("../../db/connection");

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
