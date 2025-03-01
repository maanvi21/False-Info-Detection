import React from "react";
import "./Studenthp.css";
import Button from "../Button";
import UserNavbar from "./UserNavbar";
import Announcements from "../Announcements"; // Add this line to import the component
import NewsInput from "../NewsInput";


const Studenthp = () => {
 

  return (
    <div className="student-container">
      <UserNavbar />

      <h1 className="student-header">STUDENT</h1>

      <div className="content-container">
        {/* Announcements Section */}
        <Announcements />
        

        {/* News Section */}
  
           
            <NewsInput/>
            
      </div>
    </div>
  );
};

export default Studenthp;
