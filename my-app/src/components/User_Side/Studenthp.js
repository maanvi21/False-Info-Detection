import React from "react";
import "./Studenthp.css";
import Button from "../Button";
import UserNavbar from "./UserNavbar";
import StudentAnnouncements from "./StudentAnnouncements"; // Add this line to import the component


const Studenthp = () => {
 

  return (
    <div className="student-container">
      <UserNavbar />

      <h1 className="student-header">STUDENT</h1>

      <div className="content-container">
        {/* Announcements Section */}
        <StudentAnnouncements />
        

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
            <Button text="CHECK" onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studenthp;
