//COMMENTS ROUTES
module.exports = (chai, app) =>
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
          chai.expect(res.body.insertedCount).to.equal(1);
          chai.expect(res.body.ops[0]).to.deep.contain(body.commentData);
          done(err);
        });
    });
    test("GET '/:comment_id' will get comment by id", function (done) {
      chai
        .request(app)
        .get(`/comments/${comment_id}`)
        .end((err, res) => {
          chai.expect(res).status(200);
          chai.expect(res.body).to.deep.contain(body.commentData);
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
              chai.expect(res).status(200);
              chai.expect(res.body.subcomments.length).to.be.gte(1);
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
          chai.expect(res).status(200);
          chai.expect(res.body.value).to.include({
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
          chai.expect(res).to.have.status(200);
          chai.expect(res.body.deletedCount).eql(2);
        })
        .then(() => {
          //Verify comment and subcomments no longer exist after operation.
          chai
            .request(app)
            .get(`/comments/${comment_id}`)
            .end((err, res) => {
              chai.expect(res.body).to.be.empty;
              done(err);
            });
        })
        .catch((err) => {
          done(err);
        });
    });
  });
