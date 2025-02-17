import React, { useState, useEffect, useRef } from "react";
import "./Adminhp.css";
import Button from "../Button";
import AdminNavbar from "./AdminNavbar";

const Adminhp = () => {
  const [announcement, setAnnouncement] = useState("");


  const [announcements, setAnnouncements] = useState([
    "🚀 Welcome to the Admin Panel!",
    "📢 Server maintenance scheduled for Sunday at 10 PM.",
    "⚠️ Reminder: Update your passwords regularly for security.",
    "🌟 New feature added! Check out the latest dashboard updates.",
    "📅 Upcoming event: Tech Webinar on AI Trends - Register now!",
    "🔔 Don't forget to submit your weekly reports by Friday!",
    "🎉 Congratulations to the team for achieving the Q1 target!"
    
  ]);
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 2; // Adjust speed
      }
    }, 100); // Adjust interval speed

    return () => clearInterval(interval);
  }, [announcements]);

const typeAnnouncement=(e)=>{
  setAnnouncement(e.target.value);
  console.log(e.target.value);
}

// add posted abbouncement to dataset
const postAnnouncement = async () => {
  if (!announcement.trim()) {
    alert("Please enter an announcement");
    return;
  }
  
  try {
    const response = await fetch("http://localhost:5000/post-news/add-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: announcement }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Update local announcements array with the new announcement
      setAnnouncements([...announcements, announcement]);
      alert("Announcement added successfully!");
      setAnnouncement("");
    } else {
      alert(`Failed to add announcement: ${data.error}`);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the announcement.");
  }
};

  return (
    <div className="admin-container">
      <AdminNavbar />

      <h1 className="admin-header">ADMIN</h1>

      <div className="content-container">
        {/* Announcements Section */}
        <div className="card announcement-card">
          <div className="card-header">
            <span className="speaker-icon">📢</span>
            <h2>Announcements:</h2>
          </div>
          <div className="announcement-content" ref={scrollRef}>
            <div className="scrolling-container">
              {announcements.map((item, index) => (
                <p key={index} className="announcement-item">{item}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Post Announcements Section */}
        <div className="card post-card">
          <h2 className="post-header">Post Your Announcements</h2>
          <div className="post-content">
            <textarea
              placeholder="TYPE YOUR ANNOUNCEMENT HERE..."
              className="post-input"
              onChange={typeAnnouncement}
              value={announcement}
            />
            <Button text="POST" onClick={postAnnouncement} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhp;
