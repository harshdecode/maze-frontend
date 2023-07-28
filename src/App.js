import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import FeedPage from './components/Feed';
import Navbar from './Navbar';
import ManageUsersPage from './components/ManageUsers';
import AddUserPage from './components/AddUser';
import ReportsPage from './components/Reportspage';
import UploadFilePage from './components/Upload';

function App() {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route exact path="/" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/feed" element={<FeedPage/>} />
          <Route path="/manage" element={<ManageUsersPage/>} />
          <Route path="/Add" element={<AddUserPage/>} />
          <Route path="/reports" element={<ReportsPage/>} />
          <Route path="/Upload" element={<UploadFilePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


