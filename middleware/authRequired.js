const OktaJwtVerifier = require("@okta/jwt-verifier");
require("dotenv").config();

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: `https://${process.env.OKTA_DOMAIN}/oauth2/default`, // required
});

/**
 * Checks if incoming request headers contain a valid access token.
 *
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {NextFunction} next Reference to subsequent function
 * @returns {Promise} Promise
 */

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);
  const expectedAudience = "api://default";
  if (process.env.NODE_ENV == "test") {
    return next();
  }

  if (!match) {
    res.status(401);
    return next("Unauthorized");
  }

  const accessToken = match[1];
  // The expected audience passed to verifyAccessToken() is required, and can be either a string (direct match) or
  // an array  of strings (the actual aud claim in the token must match one of the strings).
  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
}

module.exports = { authRequired };
