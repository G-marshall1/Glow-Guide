const typeDefs = `
  type City {
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

  type Query {
    users: [User]
    user: User
    city: City 
    cities: [City]
  }

  type Mutation {
    createMatchup(tech1: String!, tech2: String!): Matchup
    createVote(_id: String!, techNum: Int!): Matchup

    login():
    createUser():
    deleteUser():
    addAlert():
    removeAlert():
    removeCity():
    addCity():
  }
`;

module.exports = typeDefs;
