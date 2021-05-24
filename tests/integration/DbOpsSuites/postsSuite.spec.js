//POSTS ROUTES
module.exports = (chai, app) =>
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
          chai.expect(res).status(201);
          chai.expect(res.body.insertedCount).to.equal(1);
          done(err);
        });
    });
    test("GET '/:post_id' will fetch post by id", function (done) {
      chai
        .request(app)
        .get(`/posts/${post_id}`)
        .end((err, res) => {
          chai.expect(res).status(200);
          chai.expect(res.body[0]).to.deep.contain(body.postData);
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
          chai.expect(res).status(200);
          chai.expect(res.body.value).to.include({
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
              chai.expect(res).to.have.status(200);
              chai.expect(res.body.postResult.deletedCount).eqls(1);
              chai.expect(res.body.commentResult.deletedCount).to.eql(1);
            })
            .then(() => {
              //Verify post no longer exists after operation.
              chai
                .request(app)
                .get(`/posts/${post_id}`)
                .end((err, res) => {
                  chai.expect(res.body).to.be.empty;
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
