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

        UserServices.createUser({ userData: { username: "bill" } });

        assert.typeOf(stub.args[0][0], "object");
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
  });

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
  });

  suite("./helpers", function () {
    suite("- prepareNewUser", function () {
      teardown(function () {
        sinon.restore();
      });

      test("returns an object", function () {
        const testFormData = {
          first_name: "bill",
          last_name: "mcc",
          birthdate: new Date("10/22/1995"),
          location: {
            country: "United States",
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
  });
});
