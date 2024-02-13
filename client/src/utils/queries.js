import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
      me {
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

// export const USER = gql`
//   query user($username: username, $email: email) {
//     user(username: $username, email: $email) {
//       user {
//         username
//         email
//         locations {
//           name
//           longitude
//           latitude
//           country
//           state
//           ZIP
//         }
//         preferences: {
//           email
//           text
//           phonecall
//           strengthMinimum
//         }        
//       }
//     }
//   }`
  
// export const USERS = gql`
//   query users {
//     users {      
//         user {
//           username
//           email
//           locations {          
//             name
//             longitude
//             latitude
//             country
//             state
//             ZIP
//           }          
//           preferences {
//             email
//             text
//             phonecall
//             strengthMinimum
//           }        
//         }
//       ]
//     }
//   }`

// export const CITY = gql`
//   query city($cityName: cityName) {
//     city(cityName: $cityName) {
//       city{
//         name
//         longitude
//         latitude
//         country
//         state
//         ZIP
//       }
//     }
//   }`

// export const CITIES = gql`
//   query cities {
//     cities {
//         city{
//           name
//           longitude
//           latitude
//           country
//           state
//           ZIP
//         }
//     }
//   }`

// export const USERS_BY_CITY = gql`
//   query city($cityName: cityName) {
//     city(cityName: $cityName) {
//       users {
//         [
//           user {
//             username
//             email
//             locations: [
//               city{
//                 name
//                 longitude
//                 latitude
//                 country
//                 state
//                 ZIP
//               }
//             ]
//             preferences: {
//               email
//               text
//               phonecall
//               strengthMinimum
//             }        
//           }
//         ]
//       }
//     }
//   }
// `
