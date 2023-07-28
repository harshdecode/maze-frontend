import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };
     
  
    // Make the API request to authenticate the user and obtain the token
    axios
      .post('http://127.0.0.1:3000/login', loginData)
      .then((response) => {
        const token = response.data.token;
    

        // Save the token to local storage
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', response.data.user_id);
        console.log(response.data.user_id)
      
        // Navigate to the feed page or any desired page
        navigate('/feed');
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage('Invalid email or password');
      });
  };

  // Check if the user is already logged in and redirect to the feed page
  if (localStorage.getItem('token')) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className="Lpage-container">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <p>
          Don't have an account? <Link to="/">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
