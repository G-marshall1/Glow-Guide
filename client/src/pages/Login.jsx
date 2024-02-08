import React, { useState, useMutation } from 'react';
// import { LOGIN } from '../utils/mutations'

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // This field can accept either username or email
    password: '',
  });
  // const [loginUser] = useMutation(LOGIN)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
        try {
          const { data } = await loginUser({ ...formData })

        } catch (error) {
          // Handle network or other errors
          console.error('Error during login:', error);
        }
      ;
    // Add your login logic here
    console.log('Form submitted:', formData);
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
            value={formData.identifier}
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
            value={formData.password}
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
