const { User, City } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { userId } ) => {
      return User.findOne({ _id: userId });
    },
    users: async() => {
      return User.find({})
    },
    city: async (parent, { cityId } ) => {
      return City.findOne({ _id: cityId })
    },
    cities: async() => {
      return City.find({})
    }
  },
  Mutation: {
    login: async (parent, { username, email, password }) => {
      data = username | email
      const user = await User.findOne({ data });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async(parent, { username, email, password }) => {
      const user = await User.create({ username, email, password })
      const token = signToken(user)

      return { token, user }
    },
    removeUser: async(parent, args, context) => {
      if (!context.user) throw AuthenticationError
      return User.findOneAndDelete({ _id: context.user._id })
    },
    addCity: async(parent, { city }, context) => {
      if (!context.user) throw AuthenticationError

      const checkCity = await City.findOne({ name: city.name }) 
      if(!checkCity) var cityData = await City.create(city)
      else var cityData = checkCity

      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { locations: cityData._id.toString() }},
        { new: true, runValidators: true }
      )      
    },
    removeCity: async(parent, { city }, context) => {
      if (!context.user) throw AuthenticationError

      const cityData = await City.findOne({ name: city.name })
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { locations: cityData._id.toString() } },
        { new: true }
      )
    },
    updatePreferences: async(parent, { preferences }, context) => {
      if (!context.user) throw AuthenticationError

      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { preferences: preferences }},
        { new: true, runValidators: true }
      )
    },    
  },
};

module.exports = resolvers;
