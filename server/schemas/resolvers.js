const { User, City } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    user: async (parent, { username, email } ) => {
      if (username) return await User.findOne({ username: username }).populate('locations')
                    return await User.findOne({ email: email}).populate('locations')
    },
    users: async() => {
      return await User.find({}).populate('locations')
    },
    city: async (parent, { cityName } ) => {
      return await City.findOne({ name: cityName })
    },
    cities: async() => {
      return await City.find({})
    },
    usersByCity: async(parent, { cityName } ) => {
      const users = await User.find({}).populate('locations')
      const filteredUsers = users.filter((user) => {
        check = false
        user.locations.forEach((location => {
          if (location.name == cityName) check = true
        }))
        return check
      })
      return filteredUsers
    }
  },
  Mutation: {
    login: async (parent, { username, email, password }) => {
      if (username) var userData = await User.findOne({ username: username }).populate('locations')
      else          var userData = await User.findOne({ email: email}).populate('locations')
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
      return await User.findOneAndDelete({ _id: context.user._id })
    },
    addCity: async(parent, { city }, context) => {
      if (!context.user) throw AuthenticationError

      const checkCity = await City.findOne({ name: city.name }) 
      if(!checkCity) var cityData = await City.create(city)
      else var cityData = checkCity

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { locations: cityData._id.toString() }},
        { new: true, runValidators: true }
      ).populate('locations')      
    },
    removeCity: async(parent, { city }, context) => {
      if (!context.user) throw AuthenticationError

      const cityData = await City.findOne({ name: city.name })
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { locations: cityData._id.toString() } },
        { new: true }
      ).populate('locations')
    },
    updatePreferences: async(parent, { preferences }, context) => {
      if (!context.user) throw AuthenticationError

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $set: { preferences: preferences }},
        { new: true, runValidators: true }
      ).populate('locations')
    },    
  },
};

module.exports = resolvers;
