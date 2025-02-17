import React, { useState } from "react";
import "./Adminhp.css";
import Button from "../Button";
import AdminNavbar from "./AdminNavbar";
import Announcements from "../Announcements";

const Adminhp = () => {
  const [announcementTitle, setAnnouncementTitle] = useState("");


const typeAnnouncement=(e)=>{
  setAnnouncementTitle(e.target.value);
  console.log(e.target.value);
}

// add posted abbouncement to dataset
const postAnnouncement = async () => {
  if (!announcementTitle.trim()) {
    alert("Please enter an announcement");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/post-news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcementTitle,
        description:"",
       }),
    });

    const data = await response.json();

    if (response.ok) {
      // Update local announcements array with the new announcement
    
      alert("Announcement added successfully to both MongoDB and CSV!");
      setAnnouncementTitle("");
    } else {
      alert(`Failed to add announcement: ${data.error}`);
    }
  } catch (error) {
    console.error("❌ Error:", error);
    alert("❌ An error occurred while adding the announcement.");
  }
};


  return (
    <div className="admin-container">
      <AdminNavbar />

      <h1 className="admin-header">ADMIN</h1>

      <div className="content-container">
        {/* Announcements Section */}
   <Announcements/>

        {/* Post Announcements Section */}
        <div className="card post-card">
          <h2 className="post-header">Post Your Announcements</h2>
          <div className="post-content">
            <textarea
              placeholder="TYPE YOUR ANNOUNCEMENT HERE..."
              className="post-input"
              onChange={typeAnnouncement}
              value={announcementTitle}
            />
            <Button text="POST" onClick={postAnnouncement} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhp;
