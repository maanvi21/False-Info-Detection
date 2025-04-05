import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Announcements.css";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const scrollRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("http://localhost:5000/display-announcements");
        const data = await response.json();
        
        console.log("Fetched Announcements:", data);
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to fetch announcements: " + error.message);
      }
    };
    
    fetchAnnouncements();
  }, []);

  // Use a separate scroll position tracker for smoother scrolling
  useEffect(() => {
    let animationFrameId;
    let scrollPosition = 0;
    
    const smoothScroll = () => {
      if (scrollRef.current && autoScroll) {
        // Increment by a small amount for smooth scrolling
        scrollPosition += 0.5;
        scrollRef.current.scrollTop = scrollPosition;
        
        // Reset scroll position when reaching bottom
        if (scrollPosition >= scrollRef.current.scrollHeight - scrollRef.current.clientHeight) {
          scrollPosition = 0;
        }
        
        animationFrameId = requestAnimationFrame(smoothScroll);
      }
    };
    
    if (autoScroll && announcements.length > 0) {
      animationFrameId = requestAnimationFrame(smoothScroll);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoScroll, announcements]);

  const handleAnnouncementClick = (announcement) => {
    navigate(`/announcement/${announcement._id}`, { state: { announcement } });
  };

  const toggleScrollMode = () => {
    setAutoScroll(!autoScroll);
  };

  return (
    <div>
      <div className="announcement-card">
        <div className="card-header">
          <span className="speaker-icon">📢</span>
          <h2>Announcements:</h2>
          <button 
            className={`toggle-button ${autoScroll ? 'auto' : 'manual'}`}
            onClick={toggleScrollMode}
          >
            {autoScroll ? 'Auto-Scroll' : 'Manual Scroll'}
          </button>
        </div>
        <div 
          className={`announcement-content ${!autoScroll ? 'manual-scroll' : ''}`} 
          ref={scrollRef}
        >
          <div className="announcement-list">
            {announcements.map((item, index) => (
              <p 
                key={index} 
                className="announcement-item" 
                onClick={() => handleAnnouncementClick(item)}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Announcements;