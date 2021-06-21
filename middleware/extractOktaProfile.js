const { execute } = require("../utils");
require("dotenv").config();

const command = `curl --request POST \
--url https://${process.env.OKTA_DOMAIN}/oauth2/default/v1/token \
--header 'accept: application/json' \
--header 'authorization: Basic ${process.env.OKTA_CLIENTCRED_BASIC}' \
--header 'cache-control: no-cache' \
--header 'content-type: application/x-www-form-urlencoded' \
--data 'grant_type=client_credentials&scope=${process.env.OKTA_CLIENTCRED_SCOPE}'`;

function extractOktaInfo(req, res, next) {
  execute(command)
    .then((childResult) => {
      const tokenData = JSON.parse(childResult.standardOutput);
      const token = tokenData.access_token;
      req.oktaBearer = token;
      next();
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
}

module.exports = { extractOktaInfo };
