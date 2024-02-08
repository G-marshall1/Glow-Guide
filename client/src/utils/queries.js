import { gql } from '@apollo/client';

export const QUERY_TECH = gql`
  query tech {
    tech {
      _id
      name
    }
  }
`;

export const QUERY_MATCHUPS = gql`
  query matchups($_id: String) {
    matchups(_id: $_id) {
      _id
      tech1
      tech2
      tech1_votes
      tech2_votes
    }
  }
`;

export const USER = gql`
  query user($username: username, $email: email) {
    user(username: $username, email: $email) {
      user {
        username
        email
        locations: [city{
          name
          longitude
          latitude
          country
          state
          ZIP
        }]
        preferences: {
          email
          text
          phonecall
          strengthMinimum
        }        
      }
    }
  }`
  
export const USERS = gql`
  query users {
    users {
      [
        user {
          username
          email
          locations: [
            city{
              name
              longitude
              latitude
              country
              state
              ZIP
            }
          ]
          preferences: {
            email
            text
            phonecall
            strengthMinimum
          }        
        }
      ]
    }
  }`

export const CITY = gql`
  query city($cityName: cityName) {
    city(cityName: $cityName) {
      city{
        name
        longitude
        latitude
        country
        state
        ZIP
      }
    }
  }`

export const CITIES = gql`
  query cities {
    cities {
      [
        city{
          name
          longitude
          latitude
          country
          state
          ZIP
        }
      ]
    }
  }`

export const USERS_BY_CITY = gql`
  query city($cityName: cityName) {
    city(cityName: $cityName) {
      users {
        [
          user {
            username
            email
            locations: [
              city{
                name
                longitude
                latitude
                country
                state
                ZIP
              }
            ]
            preferences: {
              email
              text
              phonecall
              strengthMinimum
            }        
          }
        ]
      }
    }
  }
`
