import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '', // This field can accept either username or email
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch('', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Successful login, you can redirect or perform any other actions
            console.log('Login successful!');
          } else {
            // Handle login error (e.g., incorrect credentials)
            console.error('Login failed:', await response.json());
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error during login:', error);
        }
      };
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
