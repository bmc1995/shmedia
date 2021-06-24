const okta = require("@okta/okta-sdk-nodejs");
const { config } = require("./config");

/**
 * Okta API client.
 *
 *\@see - {@link https://developer.okta.com/okta-sdk-nodejs/jsdocs/#toc5__anchor|OAuth 2.0 Authentication}
 */

const oktaClient = new okta.Client({
  orgUrl: `https://${process.env.OKTA_DOMAIN}`,
  authorizationMode: "PrivateKey",
  clientId: `${process.env.OKTA_CLIENT_ID}`,
  scopes: ["okta.users.manage", "okta.users.read"],
  privateKey: config.jwk,
});

module.exports = { oktaClient };
