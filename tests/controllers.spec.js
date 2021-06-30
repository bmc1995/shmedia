const { assert } = require("chai");
const sinon = require("sinon");

const { UserControllers } = require("../controllers/index");
const { UserServices } = require("../services/index.js");
const OktaService = require("../services/okta/oktaUserById");
//need to refactor for okta or remove controller tests if unnecessary
suite("Controllers", function () {
  suite("#users.js", function () {
    suite("registerNewUser", function () {
      //afterEach -- restore so we don't cause memory leak.
      teardown(function () {
        sinon.restore();
      });

      test("returns a promise", function () {
        //prevent registerNewUser from calling services
        sinon.stub(UserServices, "createUser");

        assert.instanceOf(UserControllers.registerNewUser(), Promise);
      });
    });
  });
});
