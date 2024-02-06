const { Tech, Matchup } = require('../models');


const resolvers = {


  Query: {
    getAllUsers: async () => {
      return getAllUsers.find({});
    },
    getCity: async () => {
      return getCity.find({});
    },
    getAllCities: async () => {
      return getAllCities.find({});
    },
    getUser: async () => {
      return getUser.find({});
    },
  },


Mutation: {
  login: async (parent, { email, password }) => {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      throw AuthenticationError;
    }

    const correctPw = await profile.isCorrectPassword(password);

    if (!correctPw) {
      throw AuthenticationError;
    }

    const token = signToken(profile);
    return { token, profile };
  },

  CreateUser: async (parent, { name, email, password }) => {
    const profile = await Profile.create({ name, email, password });
    const token = signToken(profile);
  },


  addCity: async (parent, { profileId, skill }, context) => {
    if (context.user) {
      return Profile.findOneAndUpdate(
        { _id: profileId },
        {
          $addToSet: { skills: skill },
        },
        {
          new: true,
          runValidators: true,
        })}},

  removeCity: async (parent, { skill }, context) => {
            if (context.user) {
              return Profile.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { skills: skill } },
                { new: true }
              );
            }
            throw AuthenticationError;
          },


  deleteUser: async (parent, args, context) => {
    if (context.user) {
      return Profile.findOneAndDelete({ _id: context.user._id });
    }
    throw AuthenticationError;
  },

    

  },
      };

      module.exports = resolvers;



//*logIn, CreateUser, addAlert, addCity, removeAlert, removeCity, deleteUser, getUser, getAllUsers,

