import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loggedIn = !!token;
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      fetchUserInfo();
    } else {
      setFirstName('');
      setLastName('');
    }
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/info', {
        headers: { Authorization: localStorage.getItem('token') },
      });

      if (response.status === 200) {
        const { firstName, lastName } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
      }
    } catch (error) {
      console.error('Error fetching user info', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleButtonClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-search">
          <input type="text" className="navbar-search-input" placeholder="Search..." />
          <button className="navbar-search-button">Search</button>
        </div>
       
        <h1 className="navbar-logo">MAZE</h1>
        {isLoggedIn && (
          <div className="navbar-user">
            <span className="navbar-user-name">{`${firstName} ${lastName}`}</span>
          </div>
        )}
        {/* <div className="navbar-buttons">
          {isLoggedIn ? (
            <button className="navbar-logout" onClick={handleButtonClick}>
              Logout
            </button>
          ) : (
            <Link className="navbar-login" to="/login">
              Login
            </Link>
          )}
        </div> */}
      </div>
    </nav>
  );
}

export default Navbar;
