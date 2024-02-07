const typeDefs = `
  type City {
    _id: ID
    name: String!
    primary: Boolean
    alert: Boolean
    longitude: Float
    latitude: Float
    country: String
    state: String
    ZIP: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    locations: [City]
  }

  type Preferences {
    email: Boolean
    text: Boolean
    phonecall: Boolean
    strengthMinimum: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    users: [User]
    city(cityId: ID!): City 
    cities: [City]
  }

  type Mutation {
    login(username: String, email: String, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser: User
    addCity(city: City): User
    removeCity(city: Ctiy): User
    updatePreferences(preferences: Preferences): User
  }

`;

module.exports = typeDefs;
