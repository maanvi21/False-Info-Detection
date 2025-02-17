import React from 'react'
import "./StudentAnnouncements.css";
import { useEffect, useRef, useState } from 'react';
function StudentAnnouncements() {
    const [announcements, setAnnouncements] = useState([
        "📢 Welcome back to the new semester!",
        "📢 Exam schedules will be released soon.",
        "📢 Library hours extended until 9 PM.",
        "📢 Join the student coding challenge this week!",
        "📢 Campus maintenance on Saturday, be prepared!"
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

export default StudentAnnouncements
