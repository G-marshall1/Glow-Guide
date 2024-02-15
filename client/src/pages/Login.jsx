import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

import Auth from '../utils/auth.js';

const Login = () => {
  const [userData, setFormData] = useState({ identify: '',  password: '' });
  const [loginUser] = useMutation(LOGIN_USER)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
        try {
          const { data } = await loginUser({ variables: {...userData} })
          Auth.login(data.login.token)

        } catch (error) {
          // Handle network or other errors
          console.error('Error during login:', error);
        }
      
    // Add your login logic here
    console.log('Form submitted:', userData);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email:
          <input
            type="text"
            name="identify"
            value={userData.identify}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
