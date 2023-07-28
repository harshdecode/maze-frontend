import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './ManageUsers.css';


const ManageUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
   console.log(users);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token,
      };

      const response = await axios.get('http://127.0.0.1:3000/Users', { headers });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  
  const handleStatusChange = async (userId, active) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: token,
      };

      const updatedStatus = !active; 
      

      const userdata = {
      
        id: userId,
      }

     // Toggle the status (activate if currently deactivated, and vice versa)

      const url = `http://127.0.0.1:3000/activate`;
      const response = await axios.put(url,  userdata , { headers });

      if (response.status === 200) {
      
        // Update the user's status locally without making another API call
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, active: updatedStatus } : user
          )
        );
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleCreateUser = () => {
    // Implement the logic to open a modal or navigate to the user creation page
    navigate('/Add')
  };

  const handleUploadUsers = () => {
    // Implement the logic to open the file upload dialog
    navigate('/Upload')
  };


  return (

    <div className="page-container1">
    <h2>Manage Users</h2>

    <div className="user-buttons">
      <button className="create-button" onClick={handleCreateUser}>
        Create User
      </button>
      <button className="upload-button" onClick={handleUploadUsers}>
        Upload Users
      </button>
    </div>

    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Activate/Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ transition: 'background-color 0.2s ease' }}>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>
              <button
                    className={`status-button ${user.active ? 'activate' : 'deactivate'}`}
                    onClick={() => handleStatusChange(user.id, user.active)}
                  >
                    {user.active ? 'Deactivate' : 'Activate'}
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ManageUsersPage;
