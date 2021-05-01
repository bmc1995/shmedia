const { UserServices } = require("../services/index");

const registerNewUser = async (req, res, next) => {
  await UserServices.createUser(req.body.userData)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
};

async function getUser(req, res, next) {
  await UserServices.getUserInfo(req.params.username)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}
async function deleteUser(req, res, next) {
  await UserServices.deleteUser(req.params.username)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}

async function updateUser(req, res, next) {
  await UserServices.updateUser(req.params.username, req.body.updates)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.sendStatus(500) && next(err);
    });
}
module.exports = {
  registerNewUser,
  getUser,
  deleteUser,
  updateUser,
};
