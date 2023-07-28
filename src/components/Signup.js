import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password_digest: '',
    phone_number: ''
  }); 
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation if needed
    // Send form data to the backend using Axios
    axios
      .post('http://127.0.0.1:3000/signup', formData)
      .then((response) => {
        console.log(response.data);
        setSignupSuccess(true);
        // Redirect to the login page after successful signup
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        // Handle error cases
      });
  };

  // Check if the user is already logged in and redirect to the feed page
  if (localStorage.getItem('token')) {
    return <Navigate to="/feed" />;
  }

  return (
    <div className='page'>
  
      <div className="signup-container">
        <h2>Sign Up Page</h2>
        {signupSuccess ? (
          <p className="success-message">Signup successful! Redirecting to login page...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone_number">Phone number:</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password_digest">Password:</label>
              <input
                type="password"
                id="password_digest"
                name="password_digest"
                value={formData.password_digest}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password_confirmation">Confirm Password:</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
              />
            </div> 
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
