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
          // console.log(res)
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
    test(
      "POST '/sendFollowReq' will add recipient ID to user's pendOut and user ID to recipient's pendIn"
    );
    test(
      "POST '/acceptFollowReq' will move ID from pendIn or PendOut to current for both users"
    );
    test(
      "POST '/declineFollowReq' will remove ID from pendIn or Pendout for both users"
    );

    test("POST '/delete/:username' will delete the specified user by username.", function (done) {
      chai
        .request(app)
        .post("/users/delete/TESTbillmcc")
        .then(function (res) {
          expect(res)
            .to.have.status(200)
            .with.property("body")
            .which.contains({ ok: 1 });
          // console.log(res.body);
        })
        .then(() => {
          //Verify user no longer exists after operation.
          chai
            .request(app)
            .get("/users/TESTbillmcc")
            .end((err, res) => {
              expect(res.body).to.be.null;
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
    test("POST '/delete/:post_id will delete specified post from database", function (done) {
      chai
        .request(app)
        .post(`/posts/delete/${post_id}`)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.lastErrorObject.n).eqls(1);
          expect(res.body.value._id).to.eql(post_id);
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
          expect(res.body[0]).to.deep.contain(body.commentData);
          done(err);
        });
    });
    test("GET '/:comment_id' will get replies/subcomments if they exist", function (done) {
      chai
        .request(app)
        .get(`/comments/${comment_id}`)
        .end((err, res) => {
          expect(res).status(200);
          expect(res.body[0]).to.deep.contain(body.commentData);
          done(err);
        });
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
    test("POST '/delete/:comment_id' will delete comment specified by id", function (done) {
      chai
        .request(app)
        .post(`/comments/delete/${comment_id}`)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res.body.lastErrorObject.n).eqls(1);
          expect(res.body.value._id).to.eql(comment_id);
        })
        .then(() => {
          //Verify comment no longer exists after operation.
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
