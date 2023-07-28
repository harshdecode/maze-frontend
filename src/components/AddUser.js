import React, { useState } from 'react';
import axios from 'axios';
import './AddUser.css';
import MenuBar from './MenuBar';

const AddUserPage = () => {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    add_role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };

    axios
      .post('http://127.0.0.1:3000/add', userData, { headers })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='page-cont'>
      <div className='menubar'>
        <MenuBar />
      </div>

      <div className='add-user-container'>
        <div className='add-user-section'>
          <h2>Add Users</h2>
          {/* New container div */}
          <div className='add-user-form-container'>
            <form className='add-user-form'>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                value={userData.email}
                onChange={handleChange}
              />
              <label>Phone Number:</label>
              <input
                type='tel'
                name='phone_number'
                value={userData.phone_number}
                onChange={handleChange}
              />
              <label>First Name:</label>
              <input
                type='text'
                name='first_name'
                value={userData.first_name}
                onChange={handleChange}
              />
              <label>Last Name:</label>
              <input
                type='text'
                name='last_name'
                value={userData.last_name}
                onChange={handleChange}
              />
              <label>Assign Role:</label>
              <select
                name='add_role'
                value={userData.add_role}
                onChange={handleChange}
              >
                <option value='User'>User</option>
                <option value='Admin'>Admin</option>
              </select>
              <button type='button' onClick={handleSubmit}>
                Add User
              </button>
            </form>
          </div>
        </div>
        {/* You can add additional sections here if needed */}
      </div>
    </div>
  );
};

export default AddUserPage;
