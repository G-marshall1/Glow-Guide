// import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import TodaysGlow from './pages/TodaysGlow';
import FutureGlow from './pages/FutureGlow';
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Navigation />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;



