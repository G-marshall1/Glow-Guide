const { User, City } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    me: async (parent, { }, context) => {
      const users = await User.find({})
      return users [ Math.floor(Math.random() * users.length) ]
    },
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
    login: async (parent, { identify, password }) => {
      var user = await User.findOne({ username: identify }).populate('locations')
      if(!user) user = await User.findOne({ email: identify }).populate('locations')

      if (!user) throw AuthenticationError

      const correctPw = await user.checkPassword(password)
      if (!correctPw) throw AuthenticationError

      const token = signToken(user);
      return { token, user };
    },
    addUser: async(parent, { username, email, password }) => {
      const user = await User.create({ username, email, password })
      const cities = await City.find({})
      cities.forEach((city) => {
        user.locations.push( city._id.toString())
      })
      user.locations = cities

      const token = signToken(user)

      return { token, user }
    },
    removeUser: async(parent, args, context) => {
      if (!context.user) throw AuthenticationError
      return await User.findOneAndDelete({ _id: context.user._id })
    },
    addCity: async(parent, { data }, context) => {
      if (!context.user) throw AuthenticationError

      const checkCity = await City.findOne({ name: data.name }) 
      if(!checkCity) var cityData = await City.create(data)
      else var cityData = checkCity

      return await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { locations: cityData._id.toString() }},
        { new: true, runValidators: true }
      ).populate('locations')      
    },
    removeCity: async(parent, { city }, context) => {
      if (!context.user) throw AuthenticationError

      const cityData = await City.findOne({ name: city })
      if(!cityData) return User.findOne({ _id: context.user._id })

      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { locations: cityData._id.toString() }},
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
