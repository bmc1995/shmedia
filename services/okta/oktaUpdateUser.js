const { oktaClient } = require("./client");

async function oktaUpdateUser(id, updatedFields) {
  let updatedCount = 0;
  const user = await oktaClient.getUser(id).catch((err) => console.log(err));

  for (attr in updatedFields) {
    switch (attr) {
      case "first_name":
        user.profile.firstName = updatedFields[attr];
        updatedCount += 1;
        break;
      case "last_name":
        user.profile.lastName = updatedFields[attr];
        updatedCount += 1;
        break;
      case "username":
        user.profile.mongoUsername = updatedFields[attr];
        updatedCount += 1;
      default:
        break;
    }
  }

  if (!updatedCount) {
    return { message: "No updates required.", updatedCount };
  }

  return user
    .update()
    .then((res) => {
      return { res, updatedCount };
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

module.exports = { oktaUpdateUser };
