import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'

import Auth from '../utils/auth.js';

const Login = () => {
  const [userFormData, setUserFormData] = useState({ identifier: '',  password: '' });
  const [loginUser] = useMutation(LOGIN_USER)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();    

        try {
          const { data } = await loginUser({ ...userFormData })
          Auth.login(data.login.token)

        } catch (error) {
          // Handle network or other errors
          console.error('Error during login:', error);
        }
      
    // Add your login logic here
    console.log('Form submitted:', userFormData);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email:
          <input
            type="text"
            name="identifier"
            value={userFormData.identifier}
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
            value={userFormData.password}
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
