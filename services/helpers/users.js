const { UserProfile } = require("@okta/okta-sdk-nodejs");
/**
 * @description Creates object including okta profile to be stored in MongoDb's user collection
 * @param {Object} userData
 * @param {String} userData.id
 * @param {UserProfile} userData.profile
 *
 */

function prepareNewUser(userData) {
  return {
    first_name: userData.profile.firstName,
    last_name: userData.profile.lastName,
    username: userData.profile.displayName,
    birthdate: userData.birthdate,
    profilePic_url: userData.profilePic_url || null,
    followers: {
      pendIn: [],
      pendOut: [],
      current: [],
    },
    bio: null,
    posts: [], //posts populated by aggregation ($lookup)
    location: userData.location || { city: null, state: null },
    okta_id: userData.id,
    private: false,
  };
}

module.exports = {
  prepareNewUser,
};
