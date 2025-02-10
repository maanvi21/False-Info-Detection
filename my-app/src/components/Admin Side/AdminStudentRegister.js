import React from 'react';
import './AdminStudentRegister.css';
import AdminNavbar from './AdminNavbar';

const AdminStudentRegister = () => {
  return (
    <div className="admin-container">
      {/* Navigation Bar */}
      
      <AdminNavbar/>

      {/* Admin Header */}
      <h1 className="admin-header">ADMIN</h1>

      {/* Main Content */}
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Add Student Details</h2>
          
          <div className="form-container">
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="input-group">
                <label>Full Name:</label>
                <input type="text" placeholder="Enter student's full name" />
              </div>
              <div className="input-group">
                <label>Email:</label>
                <input type="email" placeholder="Enter student's email" />
              </div>
              <div className="input-group">
                <label>Phone Number:</label>
                <input type="tel" placeholder="Enter student's phone number" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Login Credentials</h3>
              <div className="input-group">
                <label>Username:</label>
                <input type="text" placeholder="Create username" />
              </div>
              <div className="input-group">
                <label>Password:</label>
                <input type="password" placeholder="Create password" />
              </div>
              <div className="input-group">
                <label>Confirm Password:</label>
                <input type="password" placeholder="Confirm password" />
              </div>
            </div>

            <div className="button-group">
              <button className="clear-button">CLEAR</button>
              <button className="submit-button">REGISTER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentRegister;