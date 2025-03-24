import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Announcements.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const scrollRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/display-announcements");
        const data = await response.json();
        
        console.log("Fetched Announcements:", data); // ✅ Log the response
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to fetch announcements: " + error.message);
      }
    };
  
    fetchAnnouncements();
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 0.1;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [announcements]);

  const handleAnnouncementClick = (announcement) => {
    // Navigate to FetchAnnouncements with announcement data as a URL parameter
    navigate(`/announcement/${announcement._id}`, { state: { announcement } });
  };

  return (
    <div>
      <div className="announcement-card">
        <div className="card-header">
          <span className="speaker-icon">📢</span>
          <h2>Announcements:</h2>
        </div>
        <div className="announcement-content" ref={scrollRef}>
          <div className="scrolling-container">
            {announcements.map((item, index) => (
              <p key={index} className="announcement-item" onClick={() => handleAnnouncementClick(item)}>
                {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
