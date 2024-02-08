// import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import TodaysGlow from './pages/TodaysGlow';
import FutureGlow from './pages/FutureGlow';
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todays-glow" element={<TodaysGlow />} />
          <Route path="/future-glow" element={<FutureGlow />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;



