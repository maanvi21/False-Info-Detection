import React from 'react'
import "./Announcements.css";
import { useEffect, useRef, useState } from 'react';
function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/display-announcements");
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 0.25;
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
                <p key={index} className="announcement-item">{item.title}</p>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default Announcements
