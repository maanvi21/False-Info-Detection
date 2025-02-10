import React, { useState } from 'react';

import './Adminhp.css';
import Button from '../Button';
import AdminNavbar from './AdminNavbar';

const Adminhp = () => {
  
const [announcement, setAnnouncement]= useState("");

const typeAnnouncement=(e)=>{
  setAnnouncement(e.target.value);
  console.log(e.target.value);
}

const postAnnouncement = async () => {
  if (!announcement) return;
  // port as defined in dataset_req.js

  try {
    const response = await fetch("http://localhost:5000/add-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcement }),
    });

    if (response.ok) {
      alert("Text added to CSV!");
      setAnnouncement("")
    } else {
      alert("Failed to add text.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div className="admin-container">
      {/* Navigation Bar */}
    

      <AdminNavbar/>

      {/* Admin Header */}
      <h1 className="admin-header">ADMIN</h1>

      {/* Main Content */}
      <div className="content-container">
        {/* Announcements View Section */}
        <div className="card announcement-card">
          <div className="card-header">
            <span className="speaker-icon">📢</span>
            <h2>Announcements:</h2>
          </div>
          <div className="announcement-content">
            {/* Existing announcements will be displayed here */}
          </div>
        </div>

        {/* Post Announcements Section */}
        <div className="card post-card">
          <h2 className="post-header">Post Your Announcements</h2>
          <div className="post-content">
            <textarea 
              placeholder="TYPE YOUR ANNOUNCEMENT HERE..."
              className="post-input" onChange={typeAnnouncement}
            />
      <Button text='POST' onClick={postAnnouncement}/>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Adminhp;