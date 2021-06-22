require("dotenv").config();
const okta = require("@okta/okta-sdk-nodejs");
const { config } = require("./config");

/**
 * Okta API client.
 *
 *\@see - {@link https://developer.okta.com/okta-sdk-nodejs/jsdocs/#toc5__anchor|OAuth 2.0 Authentication}
 */

const client = new okta.Client({
  orgUrl: `https://${process.env.OKTA_DOMAIN}`,
  authorizationMode: "PrivateKey",
  clientId: `${process.env.OKTA_CLIENT_ID}`,
  scopes: ["okta.users.manage", "okta.users.read"],
  privateKey: config.jwk,
});

/**
 * List all users in your organization.
 */
const orgUsersCollection = client.listUsers();

async function getAllUsers() {
  await orgUsersCollection
    .each((user) => {
      console.log(user);
    })
    .then(() => console.log("All users listed"))
    .catch((err) => console.error(err));
}
