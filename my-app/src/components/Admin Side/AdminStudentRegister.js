import React, { useState } from 'react';
import './AdminStudentRegister.css';
import AdminNavbar from './AdminNavbar';
import Button from '../Button';
import axios from 'axios';

const AdminStudentRegister = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Register Student
  const registerStudent = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
      });

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error registering student");
    }
  };

  // Cancel registration (Clears form)
  const cancelRegister = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
    setMessage('');
  };

  return (
    <div className="admin-container">
      <AdminNavbar />
      <h1 className="admin-header">ADMIN</h1>

      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Add Student Details</h2>
          
          <div className="form-container">
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="input-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter student's full name" />
              </div>
              <div className="input-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter student's email" />
              </div>
              <div className="input-group">
                <label>Phone Number:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter student's phone number" />
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Login Credentials</h3>
              <div className="input-group">
                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Create username" />
              </div>
              <div className="input-group">
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create password" />
              </div>
              <div className="input-group">
                <label>Confirm Password:</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
              </div>
            </div>

            <div className="button-group">
              <Button text='Cancel' onClick={cancelRegister} />
              <Button text='Register' onClick={registerStudent} />
            </div>

            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentRegister;
