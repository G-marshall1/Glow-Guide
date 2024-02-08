const typeDefs = `
  type City {
    _id: ID
    name: String!
    longitude: String
    latitude: String
    country: String
    state: String
    ZIP: String
  }

  input city {
    name: String!
    longitude: String
    latitude: String
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

  input Preferences {
    email: Boolean
    text: Boolean
    phonecall: Boolean
    strengthMinimum: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String, email: String): User
    users: [User]
    city(cityName: String!): City 
    cities: [City]
    usersByCity(cityName: String!): [User]
  }

  type Mutation {
    login(username: String!, email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser: User
    addCity(city: city!): User
    removeCity(city: city!): User
    updatePreferences(preferences: Preferences): User
  }
`;

module.exports = typeDefs;
