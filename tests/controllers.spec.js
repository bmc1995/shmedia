const { assert } = require("chai");
const sinon = require("sinon");

const { UserControllers } = require("../controllers/index");
const { UserServices } = require("../services/index.js");

suite("Controllers", function () {
  suite("#users.js", function () {
    suite("registerNewUser", function () {
      //afterEach -- restore so we don't cause memory leak.
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        //prevent registerNewUser from calling services
        //we are only testing the behavior of this unit.
        sinon.stub(UserServices, "createUser");

        assert.instanceOf(UserControllers.registerNewUser(), Promise);
      });

      test("calls createUser service", function () {
        //need to access the stub this time.
        let createUserStub = sinon.stub(UserServices, "createUser");

        UserControllers.registerNewUser({ body: "test" });

        assert.isTrue(createUserStub.called);
      });
    });
  });
});
