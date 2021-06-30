const { assert } = require("chai");
const sinon = require("sinon");

const {
  UserServices,
  PostServices,
  CommentServices,
} = require("../services/index");
const {
  UserServiceHelpers,
  PostServiceHelpers,
  CommentServiceHelpers,
} = require("../services/helpers/index");
const { UserDbOps, PostDbOps, CommentDbOps } = require("../db/index");
const { ObjectId } = require("bson");

suite("Services", function () {
  suite("#users.js", function () {
    suite("- createUser", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(UserServices.createUser);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("calls prepareNewUser.js before userCreate.js", function () {
        let userCreateStub = sinon.stub(UserDbOps, "userCreate");
        let prepareNewUserStub = sinon.stub(
          UserServiceHelpers,
          "prepareNewUser"
        );

        UserServices.createUser({ username: "bill" });

        assert.isTrue(prepareNewUserStub.calledBefore(userCreateStub));
      });

      test("an object is passed to userCreate.js", function () {
        let stub = sinon.stub(UserDbOps, "userCreate");

        UserServices.createUser({ profile: { username: "bill" } });

        assert.typeOf(stub.args[0][0], "Object");
      });
    });

    suite("- getUserInfo", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(UserServices.getUserInfo);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("a string is passed to userRead.js", function () {
        let stub = sinon.stub(UserDbOps, "userRead");

        UserServices.getUserInfo("bill");

        assert.typeOf(stub.args[0][0], "string");
      });
    });

    suite("- updateUser", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(UserServices.getUserInfo);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("a string and object are passed to userUpdate", function () {
        let stub = sinon.stub(UserDbOps, "userUpdate");

        UserServices.updateUser("test", { location: { state: "CO" } });

        assert.typeOf(stub.args[0][0], "string");
        assert.typeOf(stub.args[0][1], "object");
      });
    });

    suite("- deleteUser", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(UserServices.deleteUser);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("a string is passed to userDelete.js", function () {
        let stub = sinon.stub(UserDbOps, "userDelete");

        UserServices.deleteUser("bill");

        assert.typeOf(stub.args[0][0], "string");
      });
    });
    suite("- sendFollowReq", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        let fake = sinon.fake(UserServices.sendFollowReq);

        let returns = fake();

        assert.instanceOf(returns, Promise);
      });

      test("a sender_id and receiver_id are passed to userSendFollowReq.js", function () {
        let stub = sinon.stub(UserDbOps, "userSendFollowReq");

        UserServices.sendFollowReq(100, 200);

        assert.isDefined(stub.args[0][0]);
        assert.isDefined(stub.args[0][1]);
      });
    });
    suite("- acceptFollowReq", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        let fake = sinon.fake(UserServices.acceptFollowReq);

        let returns = fake();

        assert.instanceOf(returns, Promise);
      });

      test("a sender_id and receiver_id are passed to userAcceptFollowReq.js", function () {
        let stub = sinon.stub(UserDbOps, "userAcceptFollowReq");

        UserServices.acceptFollowReq(100, 200);

        assert.isDefined(stub.args[0][0]);
        assert.isDefined(stub.args[0][1]);
      });
    });
    suite("- declineFollowReq", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        let fake = sinon.fake(UserServices.declineFollowReq);

        let returns = fake();

        assert.instanceOf(returns, Promise);
      });

      test("a sender_id and receiver_id are passed to userDeclineFollowReq.js", function () {
        let stub = sinon.stub(UserDbOps, "userDeclineFollowReq");

        UserServices.declineFollowReq(100, 200);

        assert.isDefined(stub.args[0][0]);
        assert.isDefined(stub.args[0][1]);
      });
    });
    suite("- unfollowUser", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        let fake = sinon.fake(UserServices.unfollowUser);

        let returns = fake();

        assert.instanceOf(returns, Promise);
      });

      test("a user and targetUser are passed to userSendFollowReq.js", function () {
        let stub = sinon.stub(UserDbOps, "userUnfollow");

        UserServices.unfollowUser(100, 200);

        assert.isDefined(stub.args[0][0]);
        assert.isDefined(stub.args[0][1]);
      });
    });
  });

  suite("#posts.js", function () {
    suite("- createPost", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(PostServices.createPost);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("calls prepareNewPost.js before postCreate.js", function () {
        let postCreateStub = sinon.stub(PostDbOps, "postCreate");
        let prepareNewPostStub = sinon.stub(
          PostServiceHelpers,
          "prepareNewPost"
        );

        PostServices.createPost({ username: "test" });

        assert.isTrue(prepareNewPostStub.calledBefore(postCreateStub));
      });

      test("an object is passed to postCreate.js", function () {
        let stub = sinon.stub(PostDbOps, "postCreate");

        PostServices.createPost({ postData: { username: "bill" } });

        assert.typeOf(stub.args[0][0], "object");
      });
    });

    suite("- getPost", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(PostServices.getPost);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("an ObjectId is passed to postRead.js", function () {
        let stub = sinon.stub(PostDbOps, "postRead");

        PostServices.getPost(ObjectId());

        assert.instanceOf(stub.args[0][0], ObjectId);
      });
    });

    suite("- updatePost", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(PostServices.updatePost);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("an ObjectId and object are passed to postUpdate", function () {
        let stub = sinon.stub(PostDbOps, "postUpdate");

        PostServices.updatePost(ObjectId(), { location: { state: "CO" } });

        assert.instanceOf(stub.args[0][0], ObjectId);
        assert.typeOf(stub.args[0][1], "object");
      });
    });

    suite("- deletePost", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(PostServices.deletePost);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("an ObjectId is passed to postDelete.js", function () {
        let stub = sinon.stub(PostDbOps, "postDelete");

        PostServices.deletePost(ObjectId());

        assert.instanceOf(stub.args[0][0], ObjectId);
      });
    });

    suite("- deletePostsByUser", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(PostServices.deletePostsByUser);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("a username is passed to postDeleteAllByUser.js", function () {
        let stub = sinon.stub(PostDbOps, "postDeleteAllByUser");

        PostServices.deletePostsByUser("username");

        assert.isDefined(stub.args[0][0]);
      });
    });
  });
  //deletePostsByUser

  suite("#comments.js", function () {
    suite("- createComment", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(CommentServices.createComment);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("calls prepareNewComment.js before commentCreate.js", function () {
        let commentCreateStub = sinon.stub(CommentDbOps, "commentCreate");
        let prepareNewCommentStub = sinon.stub(
          CommentServiceHelpers,
          "prepareNewComment"
        );

        CommentServices.createComment({ username: "test" });

        assert.isTrue(prepareNewCommentStub.calledBefore(commentCreateStub));
      });

      test("an object is passed to commentCreate.js", function () {
        let stub = sinon.stub(CommentDbOps, "commentCreate");

        CommentServices.createComment({ commentData: { username: "bill" } });

        assert.typeOf(stub.args[0][0], "object");
      });
    });

    suite("- getComment", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(CommentServices.getComment);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("an ObjectId is passed to commentRead.js", function () {
        let stub = sinon.stub(CommentDbOps, "commentRead");

        CommentServices.getComment(ObjectId());

        assert.instanceOf(stub.args[0][0], ObjectId);
      });
    });

    suite("- updateComment", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(CommentServices.updateComment);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("an ObjectId and object are passed to commentUpdate", function () {
        let stub = sinon.stub(CommentDbOps, "commentUpdate");

        CommentServices.updateComment(ObjectId(), {
          location: { state: "CO" },
        });

        assert.instanceOf(stub.args[0][0], ObjectId);
        assert.typeOf(stub.args[0][1], "object");
      });
    });

    suite("- deleteComment", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(CommentServices.deleteComment);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("an ObjectId is passed to commentDelete.js", function () {
        let stub = sinon.stub(CommentDbOps, "commentDelete");

        CommentServices.deleteComment(ObjectId());

        assert.instanceOf(stub.args[0][0], ObjectId);
      });
    });
    //deleteCommentsByUser
    suite("- deleteCommentsByUser", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(CommentServices.deleteCommentsByUser);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("a username is passed to commentDeleteAllByUser.js", function () {
        let stub = sinon.stub(CommentDbOps, "commentDeleteAllByUser");

        CommentServices.deleteCommentsByUser("username");

        assert.isDefined(stub.args[0][0]);
      });
    });
    suite("- deleteCommentsByPost", function () {
      teardown(function () {
        sinon.restore();
      });
      test("returns a promise", function () {
        //Arrange
        let fake = sinon.fake(CommentServices.deleteCommentsByPost);
        //Act
        let returns = fake();
        //Assert
        assert.instanceOf(returns, Promise);
      });

      test("a username is passed to commentDeleteAllByPost.js", function () {
        let stub = sinon.stub(CommentDbOps, "commentDeleteAllByPost");

        CommentServices.deleteCommentsByPost("username");

        assert.isDefined(stub.args[0][0]);
      });
    });
  });

  suite("./helpers", function () {
    suite("- prepareNewUser", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns an object", function () {
        const testFormData = {
          profile: {
            firstName: "bill",
            lastName: "mcc",
            displayName: "bmcc",
            birthdate: new Date("10/22/1995"),
            location: {
              country: "United States",
            },
          },
        };

        const returnVal = UserServiceHelpers.prepareNewUser(testFormData);

        assert.typeOf(returnVal, "object");
      });
    });

    suite("- prepareNewPost", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns an object", function () {
        const testFormData = {
          username: "test",
        };

        const returnVal = PostServiceHelpers.prepareNewPost(testFormData);

        assert.typeOf(returnVal, "object");
      });
    });

    suite("- prepareNewComment", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns an object", function () {
        const testFormData = {
          username: "test",
        };

        const returnVal = CommentServiceHelpers.prepareNewComment(testFormData);

        assert.typeOf(returnVal, "object");
      });
    });

    suite("- populateSubcomments", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns an object", function () {
        const returnVal = CommentServiceHelpers.populateSubcomments(100, [
          {
            _id: 100,
            user_id: "1",
            text: "hi world this is a test comment.",
            post_id: "1",
            username: "TESTforname",
            parent_comnt_id: null,
            subcomments: [],
          },
          {
            _id: 101,
            user_id: "2",
            text: "hi world this is a test reply.",
            post_id: "1",
            username: "TESTforname",
            parent_comnt_id: 100,
            subcomments: [],
          },
        ]);

        assert.typeOf(returnVal, "object");
      });
    });

    suite("- prepareS3Upload", function () {
      teardown(function () {
        sinon.restore();
      });
      const fs = require("fs");
      const Utils = require("../utils/");

      sinon.stub(fs, "createReadStream");
      sinon.stub(Utils, "determineFileFormat");

      let returnVal = PostServiceHelpers.prepareS3Upload(
        {
          user_id: 1,
          video: false,
        },
        "fakepath"
      );
      test("returns an object", function () {
        assert.typeOf(returnVal, "object");
      });

      test("returned object has Bucket, Key, and Body keys", function () {
        assert.hasAllKeys(returnVal, ["Bucket", "Key", "Body"]);
      });
    });
  });
});
