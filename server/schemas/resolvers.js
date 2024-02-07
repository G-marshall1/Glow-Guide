const { User, City } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { username, email } ) => {
      if (username) return User.findOne({ username: username });
                    return User.findOne({ email: email})
    },
    users: async() => {
      return User.find({})
    },
    city: async (parent, { cityName } ) => {
      return City.findOne({ name: cityName })
    },
    cities: async() => {
      return City.find({})
    }
  },
  Mutation: {
    login: async (parent, { username, email, password }) => {
      if (username) var userData = await User.findOne({ username: username }).populate('City');
      else          var userData = await User.findOne({ email: email}).populate('City')
      const user = userData

      if (!user) throw AuthenticationError

      const correctPw = await user.isCorrectPassword(password)
      if (!correctPw) throw AuthenticationError

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
      ).populate('City')      
    },
    removeCity: async(parent, { city }, context) => {
      if (!context.user) throw AuthenticationError

      const cityData = await City.findOne({ name: city.name })
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { locations: cityData._id.toString() } },
        { new: true }
      ).populate('City')
    },
    updatePreferences: async(parent, { preferences }, context) => {
      if (!context.user) throw AuthenticationError

      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { preferences: preferences }},
        { new: true, runValidators: true }
      ).populate('City')
    },    
  },
};

module.exports = resolvers;
