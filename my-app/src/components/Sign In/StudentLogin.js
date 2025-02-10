
import React, { useState } from 'react';
import './StudentLogin.css';
import { useNavigate } from 'react-router-dom';
import Back from '../Back';
import axios from 'axios';
import Button from '../Button';
function StudentLogin() {

  // mongodb connection

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);  // Use '/api/login'
      console.log(response.data);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Store token in local storage
        alert("Login Successful!");
        navigate('/studenthome'); // Redirect to student dashboard
      } else {
        alert("No token received");
      }
    } catch (error) {
      console.error(error.response?.data); // Log the error message from the backend
      alert(error.response?.data?.message || "Invalid Username or Password!");
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
   
        <Back/>
        
        <h1 className="login-title">Login as Student</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
            />
          </div>

          <Button text='LOGIN' onClick={ handleSubmit}/>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;


  