import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faUser, faSignOutAlt, faFile } from '@fortawesome/free-solid-svg-icons';
import './MenuBar.css';

const MenuBar = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    const headers = {
      Authorization: token, // Assuming your backend expects the token in the "Authorization" header
    };

    // Function to fetch admin data from the backend
    const fetchAdminData = async () => {
      try {
        // Make an API call to get admin data
        const response = await axios.post(`http://127.0.0.1:3000/admin?user_id=${userId}`, {
          headers,
          // Pass email as a query parameter or in the request body, depending on your backend
        });

        if (response.status === 200) {
          setIsAdmin(response.data.admin);
        } else {
          // Handle the case where the API call fails or returns an error
          console.error('Failed to fetch admin data');
        }
      } catch (error) {
        console.error('Error occurred while fetching admin data:', error);
      }
    };

    fetchAdminData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleFeedClick = () => {
    navigate('/feed');
  };

  const handleManageUsersClick = () => {
    navigate('/manage');
  };

  const handleReportsClick = () => {
    navigate('/reports');
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    // Navigate to the login page or any desired page
    navigate('/login');
  };

  return (
    <div className="menu-bar">
      <button className="menu-button feed-button" onClick={handleFeedClick}>
        <FontAwesomeIcon icon={faNewspaper} className="icon" />
        <span className="menu-item-label">Feed</span>
      </button>

      {isAdmin && (
        // Only show the "Manage Users" and "Reports" buttons if the user is an admin
        <div>
          <button className="menu-button manage-user-button" onClick={handleManageUsersClick}>
      <FontAwesomeIcon icon={faUser} className="icon" />
      <span className="menu-item-label">Manage Users</span>
    </button>
    <button className="menu-button button-like button-like-reports" onClick={handleReportsClick}>
      <FontAwesomeIcon icon={faFile} className="icon" />
      <span className="menu-item-label">Reports</span>
    </button>
        </div>
      )}
      <button className="menu-button logout-button" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
        <span className="menu-item-label">Logout</span>
      </button>
    </div>
  );
};

export default MenuBar;
