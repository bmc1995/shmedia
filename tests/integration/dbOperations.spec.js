const MMS = require("./mongoTestConfig");

const runUsersSuite = require("./DbOpsSuites/usersSuite.spec");
const runPostsSuite = require("./DbOpsSuites/postsSuite.spec");
const runCommentsSuite = require("./DbOpsSuites/commentsSuite.spec");

const usersRouter = require("../../routes/users");
const postsRouter = require("../../routes/posts");
const commentsRouter = require("../../routes/comments");

const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use(function (err, req, res, next) {
  //dont log if MongoError for test readability.
  if (err.name == "MongoError") {
    null;
  }
});

const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Routes and Controllers", function () {
  suiteSetup(async () => {
    await MMS.start().catch((err) => Promise.reject(err));
  });

  suiteTeardown(() => {
    MMS.stop().catch((err) => Promise.reject(err));
  });
  //test user routes
  runUsersSuite(chai, app);
  //test post routes
  runPostsSuite(chai, app);
  //test comment routes
  runCommentsSuite(chai, app);
});
