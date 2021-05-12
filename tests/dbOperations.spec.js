const { assert } = require("chai");
const { MongoClient } = require("mongodb");
const sinon = require("sinon");

const { UserDbOps, PostDbOps, CommentDbOps } = require("../db/index");

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

    suite("userSendFollowReq", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userSendFollowReq);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("userAcceptFollowReq", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userAcceptFollowReq);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("userDeclineFollowReq", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userDeclineFollowReq);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("userUnfollow", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(UserDbOps.userUnfollow);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });
  });

  suite("#posts.js", function () {
    suite("postCreate", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(PostDbOps.postCreate);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("postUpdate", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(PostDbOps.postUpdate);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("postDelete", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(PostDbOps.postDelete);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
        // assert.instanceOf(fake(), Promise);
      });
    });

    suite("postRead", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(PostDbOps.postRead);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });
  });

  suite("#comments.js", function () {
    suite("commentCreate", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(CommentDbOps.commentCreate);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("commentUpdate", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(CommentDbOps.commentUpdate);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });

    suite("commentDelete", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(CommentDbOps.commentDelete);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
        // assert.instanceOf(fake(), Promise);
      });
    });

    suite("commentRead", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        const fake = sinon.fake(CommentDbOps.commentRead);
        sinon.stub(MongoClient, "connect");

        const returns = fake();

        assert.instanceOf(returns, Promise);
      });
    });
  });
});
