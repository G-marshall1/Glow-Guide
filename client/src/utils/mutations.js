import { gql } from '@apollo/client';

export const CREATE_MATCHUP = gql`x`;

export const CREATE_VOTE = gql`x`;

export const LOGIN = gql`
  mutation login($username: String, $email: String, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user{
        _id
        username
        email
        locations: [{
          name
          longitude
          latitude
          country
          state
          ZIP
        }]
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
  mutation removeUser() {
    removerUser() {
      token
      user{
        _id
        username
        email
        locations: [{
          name
          longitude
          latitude
          country
          state
          ZIP
        }]
      }
    }
  }
  `
export const ADD_CITY = gql`
  mutation addCity($city: $city) {
    addCity(city: $city) {
      token
      user{
        _id
        username
        email
        locations: [{
          name
          longitude
          latitude
          country
          state
          ZIP
        }]
      }
    }
  }
  `

export const REMOVE_CITY = gql`
  mutation addCity($city: city) {
    addCity(city: $city) {
      token
      user{
        _id
        username
        email
        locations: [{
          name
          longitude
          latitude
          country
          state
          ZIP
        }]
      }
    }
  }
`

export const UPDATE_PREFERENCES = gql`
  mutation updatePreferences($preferences: preferences) {
    updatePreferences(preferences: $preferences) {
      token
      user{
        _id
        username
        email
        locations: [{
          name
          longitude
          latitude
          country
          state
          ZIP
        }]
      }
    }
  }
  `

