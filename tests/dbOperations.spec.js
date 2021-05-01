const { assert } = require("chai");
const { MongoClient } = require("mongodb");
const sinon = require("sinon");

const { UserDbOps } = require("../db/index");

suite("Database Operations", function () {
  suite("#users.js", function () {
    suite("userCreate", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userCreate);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("userUpdate", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userUpdate);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("userDelete", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userDelete);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
        // assert.instanceOf(fake(), Promise);
      });
    });

    suite("userRead", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userRead);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });
  });
});
