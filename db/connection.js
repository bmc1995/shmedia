const { MongoClient } = require("mongodb");
require("dotenv").config();

/**
 * MongoDB connection pool
 */

class Connection {
  static async open() {
    //If already connected, return current connection.
    if (this.client) {
      return this.client;
    }
    //await MongoClient connection.
    this.client = await MongoClient.connect(this.uri, this.options);
    return this.client;
  }
}

//default values
Connection.client = null;
Connection.uri = encodeURI(process.env.MONGO_URI);
Connection.options = {
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

module.exports = {
  Connection,
};
