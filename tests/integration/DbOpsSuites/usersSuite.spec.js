//USERS ROUTES
module.exports = (chai, app) =>
  suite("Users", async function () {
    const body = {
      userData: {
        first_name: "TESTbill",
        last_name: "TESTmcc",
        username: "TESTbillmcc",
        birthdate: new Date("10/22/1995").toISOString(),
        location: {
          country: "United States",
        },
      },
    };
    test("POST '/register' will create and send new user to the database.", function (done) {
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end(function (err, res) {
          // console.log(res.body);
          chai
            .expect(res)
            .to.have.status(201)
            .and.property("body")
            .contains.property("insertedCount")
            .which.equals(1);
          done(err);
        });
    });
    test("POST Writes to the users collection will throw Error if username is not unique.", function (done) {
      chai
        .request(app)
        .post("/users/register")
        .send(body)
        .end(function (err, res) {
          // console.log(res)
          chai.expect(res).to.have.status(500);
          chai.expect(res.body).eql(11000);
          done(err);
        });
    });

    test("GET '/:username' will retrieve the specified user's data by username", function (done) {
      chai
        .request(app)
        .get("/users/TESTbillmcc")
        .end(function (err, res) {
          // console.log("tests/integration/dbOperations.spec:");
          // console.log(`response body:`);
          // console.log(res.body);

          chai
            .expect(res)
            .to.have.status(200)
            .with.property("body")
            .which.deep.contains(body.userData)
            .which.includes.keys([
              "_id",
              "bio",
              "followers",
              "private",
              "profilePic_url",
              "posts",
            ]);

          done(err);
        });
    });
    test("POST 'edit/:username' will edit and save the specified user's info, then return the updated document", function (done) {
      chai
        .request(app)
        .post("/users/edit/TESTbillmcc")
        .send({
          updates: { first_name: "forname", last_name: "surname" },
        })
        .end((err, res) => {
          chai
            .expect(res)
            .to.have.status(200)
            .and.property("body")
            .has.ownProperty("value")
            .which.includes({ first_name: "forname", last_name: "surname" });
          done(err);
        });
    });
    test("POST '/sendFollowReq' will add recipient ID to user's pendOut and user ID to recipient's pendIn", function (done) {
      chai
        .request(app)
        .post("/users/sendFollowReq")
        .send({
          userData: {
            sender_id: "TESTuser1",
            receiver_id: "TESTuser2",
          },
        })
        .end((err, res) => {
          chai.expect(res).status(200);
          chai.expect(res.body.nMatched).to.equal(2);
          chai.expect(res.body.nModified).to.equal(2);
          done(err);
        });
    });
    test("POST '/acceptFollowReq' will move ID from pendIn or PendOut to current for both users", function (done) {
      chai
        .request(app)
        .post("/users/acceptFollowReq")
        .send({
          userData: {
            receiver_id: "TESTuser2",
            sender_id: "TESTuser1",
          },
        })
        .end((err, res) => {
          chai.expect(res).status(200);
          chai.expect(res.body.nMatched).to.equal(2);
          chai.expect(res.body.nModified).to.equal(2);
          done(err);
        });
    });
    test("POST '/declineFollowReq' will remove ID from pendIn or Pendout for both users", function (done) {
      chai
        .request(app)
        .post("/users/sendFollowReq")
        .send({
          userData: {
            sender_id: "TESTuser1",
            receiver_id: "TESTuser2",
          },
        })
        .then(() => {
          chai
            .request(app)
            .post("/users/declineFollowReq")
            .send({
              userData: {
                receiver_id: "TESTuser2",
                sender_id: "TESTuser1",
              },
            })
            .end((err, res) => {
              chai.expect(res).status(200);
              chai.expect(res.body.nMatched).to.equal(2);
              chai.expect(res.body.nModified).to.equal(2);
              done(err);
            });
        });
    });

    test("POST '/unfollow' will pull target user from user's followers.current array", function (done) {
      chai
        .request(app)
        .post("/users/unfollow")
        .send({
          userData: {
            user: "TESTuser2",
            targetUser: "TESTuser1",
          },
        })
        .end((err, res) => {
          chai.expect(res).status(200);
          chai.expect(res.body.matchedCount).to.equal(1, "matchedCount");
          chai.expect(res.body.modifiedCount).to.equal(1, "modifiedCount");
          done(err);
        });
    });

    test("POST '/delete/:username' will delete the specified user by username along with all posts and comments by them.", function (done) {
      chai
        .request(app)
        .post("/posts/create")
        .send({
          postData: {
            user_id: "1",
            username: "TESTbillmcc",
            profilePic_url: "",
            video: true,
            comments: [],
            media_url: "",
            caption: "hi world this is a test.",
          },
        })
        .then(async (postCreateResult) => {
          await chai
            .request(app)
            .post("/comments/create")
            .send({
              commentData: {
                user_id: "1",
                text: "hi world this is a test reply.",
                post_id: "2",
                username: "TESTbillmcc",
                parent_comnt_id: null,
                subcomments: [],
              },
            });
        })
        .then(() => {
          //Verify user, along with their posts and comments, no longer exists.
          chai
            .request(app)
            .post("/users/delete/TESTbillmcc")
            .end(function (err, res) {
              chai.expect(res).to.have.status(200);
              chai.expect(res.body.userResult).to.contain({ deletedCount: 1 });
              chai
                .expect(res.body.commentsResult)
                .to.contain({ deletedCount: 1 });
              chai.expect(res.body.postResult).to.contain({ deletedCount: 1 });
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    });
  });
