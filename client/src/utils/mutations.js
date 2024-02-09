import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($identify: String!, $password: String!) {
    login(identify: $identify, password: $password) {
      token
      user{
        _id
        username
        email
        locations {
          name
          longtiude
          latitude
          country
          state
          ZIP
        }
      }
    }
  }
  `
export const ADD_USER = gql`
  mutation addUser($username: String, $email: String, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user{
        _id
        username
        email
      }
    }
  }
  `

export const REMOVE_USER = gql`
mutation removeUser {
  removeUser   
}`  

export const ADD_CITY = gql`
  mutation addCity($data: addCityContent!) {
    addCity(data: $data) {
      _id
      username
      email
      locations {
        name
        longitude
        latitude
        country
        state
        ZIP
      }
    }
  }
`
export const UPDATE_PREFERENCES = gql`
  mutation updatePreferences($preferences: preferences) {
    updatePreferences(preferences: $preferences) {
      _id
      username
      email
      locations {
        name
        longitude
        latitude
        country
        state
        ZIP
      }
    }
  }
  `

