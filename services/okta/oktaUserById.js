const { oktaClient } = require("./client");

async function oktaUserById(userId) {
  const user = await oktaClient.getUser(userId);

  return { id: user.id, profile: user.profile };
}

module.exports = { oktaUserById };
