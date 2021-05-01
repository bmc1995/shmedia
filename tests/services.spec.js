const { assert } = require("chai");
const sinon = require("sinon");

const { UserServices } = require("../services/index");
const { UserServiceHelpers } = require("../services/helpers/index");
const { UserDbOps } = require("../db/index");

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
  });

  suite("#posts.js", function () {
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
  });
});
