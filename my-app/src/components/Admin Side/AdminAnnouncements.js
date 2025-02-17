import React from 'react'
import { useEffect,useRef,useState } from 'react';
function AdminAnnouncements() {

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
    
      const typeAnnouncement = (e) => {
        setAnnouncement(e.target.value);
      };
    
      const postAnnouncement = () => {
        if (!announcement) return;
        setAnnouncements([...announcements, announcement]); // Add new announcement
        setAnnouncement(""); // Clear input
      };
    
  return (
    <div>
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
    </div>
  )
}

export default AdminAnnouncements
