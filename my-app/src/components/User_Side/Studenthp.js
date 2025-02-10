import React from 'react';
import './Studenthp.css';
import Button from '../Button';
import UserNavbar from './UserNavbar';

const Studenthp = () => {
  return (
    <div className="student-container">
      {/* Navigation Bar */}
      
     
      <UserNavbar/>

      {/* Student Header */}
      <h1 className="student-header">STUDENT</h1>

      {/* Main Content */}
      <div className="content-container">
        {/* Announcements Section */}
        <div className="card announcement-card">
          <div className="card-header">
            <span className="speaker-icon">📢</span>
            <h2>Announcements:</h2>
          </div>
          <div className="announcement-content">
            {/* Announcement content will go here */}
          </div>
        </div>

        {/* News Section */}
        <div className="card news-card">
          <h2 className="news-header">Check Your News Here:</h2>
          <div className="news-content">
            <label>NEWS:</label>
            <input 
              type="text" 
              placeholder="TYPE YOUR INPUT HERE..."
              className="news-input"
            />
          <Button text='CHECK' onClick={''}/>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default Studenthp;