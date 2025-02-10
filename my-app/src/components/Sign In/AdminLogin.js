import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom';
import Back from '../Back';
import Button from '../Button';
function AdminLogin() {
  const navigate=useNavigate();

  const navToHome=()=>{
    navigate('/')
  }
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
const [department, setDepartment]=useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Form submitted:', formData);
  };

  
  return (
    <div className="login-container">
      <div className="login-card">
   
        <Back/>
        
        <h1 className="login-title">Login as Admin</h1>
        
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
          <div className="form-group">
          <label>Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select your department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Accounts">Accounts</option>
            <option value="Admissions">Admissions</option>
            <option value="Academics">Academics</option>
          </select>
          </div>


          <Button text='LOGIN' onClick={''}/>
       

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;