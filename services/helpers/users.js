function prepareNewUser(userData) {
  return {
    first_name: userData.first_name,
    last_name: userData.last_name,
    username: userData.username,
    birthdate: userData.birthdate,
    profilePic_url: userData.profilePic_url || null,
    followers: {
      pendIn: [],
      pendOut: [],
      current: [],
    },
    bio: null,
    posts: [], //posts populated by aggregation ($lookup)
    location: userData.location,
    private: false,
  };
}

module.exports = {
  prepareNewUser,
};
