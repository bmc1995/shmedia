const MMS = require("./mongoTestConfig");
const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const usersRouter = require("../../routes/users");
const postsRouter = require("../../routes/posts");
const commentsRouter = require("../../routes/comments");
const express = require("express");
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

suite("Routes and Controllers", function () {
  suiteSetup(async () => {
    await MMS.start().catch((err) => Promise.reject(err));
  });

  suiteTeardown(() => {
    MMS.stop().catch((err) => Promise.reject(err));
  });

  // USERS ROUTES
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
          expect(res)
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
          expect(res).to.have.status(500);
          expect(res.body).eql(11000);
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

          expect(res)
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
          expect(res)
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
          expect(res).status(200);
          expect(res.body.nMatched).to.equal(2);
          expect(res.body.nModified).to.equal(2);
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
          expect(res).status(200);
          expect(res.body.nMatched).to.equal(2);
          expect(res.body.nModified).to.equal(2);
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
              expect(res).status(200);
              expect(res.body.nMatched).to.equal(2);
              expect(res.body.nModified).to.equal(2);
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
          expect(res).status(200);
          expect(res.body.matchedCount).to.equal(1, "matchedCount");
          expect(res.body.modifiedCount).to.equal(1, "modifiedCount");
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
              expect(res).to.have.status(200);
              expect(res.body.userResult).to.contain({ deletedCount: 1 });
              expect(res.body.commentsResult).to.contain({ deletedCount: 1 });
              expect(res.body.postResult).to.contain({ deletedCount: 1 });
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  // POSTS ROUTES
  suite("Posts", function () {
    const body = {
      postData: {
        user_id: "1",
        username: "TESTforname",
        profilePic_url: "",
        video: true,
        comments: [],
        media_url: "",
        caption: "hi world this is a test.",
      },
    };
    let post_id;

    test("POST '/create will create and send new post to the database", function (done) {
      chai
        .request(app)
        .post("/posts/create")
        .send(body)
        .end((err, res) => {
          post_id = res.body.insertedId;
          expect(res).status(201);
          expect(res.body.insertedCount).to.equal(1);
          done(err);
        });
    });
    test("GET '/:post_id' will fetch post by id", function (done) {
      chai
        .request(app)
        .get(`/posts/${post_id}`)
        .end((err, res) => {
          expect(res).status(200);
          expect(res.body[0]).to.deep.contain(body.postData);
          done(err);
        });
    });
    test("POST '/edit/:post_id will edit and save specified post in the database", function (done) {
      chai
        .request(app)
        .post(`/posts/edit/${post_id}`)
        .send({
          updates: {
            caption: "hello world, test edit.",
            username: "TESTsurname",
          },
        })
        .end((err, res) => {
          expect(res).status(200);
          expect(res.body.value).to.include({
            caption: "hello world, test edit.",
            username: "TESTsurname",
          });
          done(err);
        });
    });
    test("POST '/delete/:post_id will delete specified post and associated comments from database", function (done) {
      chai
        .request(app)
        .post("/comments/create")
        .send({
          commentData: {
            user_id: "1",
            text: "hi world this is a test reply.",
            post_id: `${post_id}`,
            username: "TESTforname",
            parent_comnt_id: null,
            subcomments: [],
          },
        })
        .then(() => {
          chai
            .request(app)
            .post(`/posts/delete/${post_id}`)
            .then(function (res) {
              expect(res).to.have.status(200);
              expect(res.body.postResult.deletedCount).eqls(1);
              expect(res.body.commentResult.deletedCount).to.eql(1);
            })
            .then(() => {
              //Verify post no longer exists after operation.
              chai
                .request(app)
                .get(`/posts/${post_id}`)
                .end((err, res) => {
                  expect(res.body).to.be.empty;
                  done(err);
                });
            })
            .catch((err) => {
              done(err);
            });
        })
        .catch((err) => done(err));
    });
  });
  // COMMENTS ROUTES
  suite("Comments", function () {
    const body = {
      commentData: {
        user_id: "1",
        text: "hi world this is a test comment.",
        post_id: "1",
        username: "TESTforname",
        parent_comnt_id: null,
        subcomments: [],
      },
    };
    let comment_id;

    test("POST '/create' will create and send new comment to database", function (done) {
      chai
        .request(app)
        .post("/comments/create")
        .send(body)
        .end((err, res) => {
          comment_id = res.body.insertedId;
          expect(res.body.insertedCount).to.equal(1);
          expect(res.body.ops[0]).to.deep.contain(body.commentData);
          done(err);
        });
    });
    test("GET '/:comment_id' will get comment by id", function (done) {
      chai
        .request(app)
        .get(`/comments/${comment_id}`)
        .end((err, res) => {
          expect(res).status(200);
          expect(res.body).to.deep.contain(body.commentData);
          done(err);
        });
    });
    test("GET '/:comment_id' will get replies/subcomments if they exist", function (done) {
      chai
        .request(app)
        .post("/comments/create")
        .send({
          commentData: {
            user_id: "1",
            text: "hi world this is a test reply.",
            post_id: "1",
            username: "TESTforname",
            parent_comnt_id: `${comment_id}`,
            subcomments: [],
          },
        })
        .then(() => {
          chai
            .request(app)
            .get(`/comments/${comment_id}`)
            .end((err, res) => {
              expect(res).status(200);
              expect(res.body.subcomments.length).to.be.gte(1);
              done(err);
            });
        })
        .catch((err) => console.log(err));
    });
    test("POST '/edit/:comment_id' will edit comment specified by id", function (done) {
      chai
        .request(app)
        .post(`/comments/edit/${comment_id}`)
        .send({
          updates: {
            text: "Hi world, comment updated.",
          },
        })
        .end((err, res) => {
          expect(res).status(200);
          expect(res.body.value).to.include({
            text: "Hi world, comment updated.",
          });
          done(err);
        });
    });
    test("POST '/delete/:comment_id' will delete comment specified by id, along with any subcomments", function (done) {
      chai
        .request(app)
        .post(`/comments/delete/${comment_id}`)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.deletedCount).eql(2);
        })
        .then(() => {
          //Verify comment and subcomments no longer exist after operation.
          chai
            .request(app)
            .get(`/comments/${comment_id}`)
            .end((err, res) => {
              expect(res.body).to.be.empty;
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
