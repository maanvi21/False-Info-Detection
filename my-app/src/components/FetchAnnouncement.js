import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./FetchAnnouncement.css";

function FetchAnnouncements() {
  const location = useLocation();
  const { id } = useParams(); // Extract ID from URL
  const [announcement, setAnnouncement] = useState(location.state?.announcement || null);

  // If announcement isn't in state, fetch it using the ID from URL
  useEffect(() => {
    if (!announcement && id) {
      fetchAnnouncementById(id);
    }
  }, [announcement, id]);

  // Fetch announcement by ID
  const fetchAnnouncementById = async (announcementId) => {
    try {
      const response = await fetch(`http://localhost:5000/display-announcements/${announcementId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch announcement");
      }
      const data = await response.json();
      setAnnouncement(data);
    } catch (error) {
      console.error("❌ Error fetching announcement:", error);
    }
  };

  if (!announcement) {
    return <div className="loading">Loading announcement data...</div>;
  }

  // Format date from createdAt
  const formatDate = (dateString) => {
    if (!dateString) return "No date available";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("❌ Date formatting error:", error);
      return "Invalid date";
    }
  };

  // Download file
  // Modified handleDownload function for your FetchAnnouncement.js file
// Modified handleDownload function for your FetchAnnouncement.js file
const handleDownload = async () => {
  if (!announcement._id) {
    alert("❌ Announcement ID is missing");
    return;
  }

  try {
    const announcementId = announcement._id;
    console.log(`🔍 Attempting to download file for announcement: ${announcementId}`);
    
    // Make sure this URL matches your Express route configuration
    const downloadUrl = `http://localhost:5000/download-file/${announcementId}`;
    console.log(`📥 Fetching from: ${downloadUrl}`);
    
    // Use fetch with blob() response handling for direct file download
    const response = await fetch(downloadUrl);
    
    if (!response.ok) {
      console.error(`❌ Server returned status: ${response.status}`);
      throw new Error(`File not found (Status: ${response.status})`);
    }
    
    // Get content type from response headers
    const contentType = response.headers.get('content-type');
    console.log(`📄 Content type: ${contentType}`);
    
    // Get filename from content-disposition header if available
    let filename = 'download';
    const contentDisposition = response.headers.get('content-disposition');
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    console.log(`📄 Filename: ${filename}`);
    
    // Get file data as blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create download link and trigger it
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up object URL
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
    
    console.log(`✅ File download initiated successfully`);
    
  } catch (error) {
    console.error("❌ Download error:", error);
    alert(`Error downloading file: ${error.message}`);
  }
};
  

  return (
    <div className="container">
      <header>
        <h1>College Information Verifier</h1>
        <div className="subtitle">Your trusted platform for verifying academic information</div>
      </header>
      
      <div className="announcement-card">
        <h2 className="announcement-title">{announcement.title || "No Title"}</h2>
        
        {/* Use createdAt for date */}
        <div className="announcement-date">
          Posted on: {formatDate(announcement.createdAt)}
        </div>
        
        <div className="announcement-description">
          {Array.isArray(announcement.description) ? (
            announcement.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)
          ) : (
            <p>{announcement.description || "No description available."}</p>
          )}
        </div>
        
        {/* File section with better handling */}
        <div className="file-section">
          <h3>Attached File</h3>
          {announcement.file ? (
            <div className="file-info">
              <p>
                {announcement.file.filename ? 
                  `File: ${announcement.file.filename}` : 
                  "File attached (no name available)"}
              </p>
              <button 
                className="download-btn" 
                onClick={handleDownload}
              >
                Download File
              </button>
            </div>
          ) : (
            <p>No file attached.</p>
          )}
        </div>
      </div>
      
      <a href="/studenthome" className="back-btn">← Back to Announcements</a>
    </div>
  );
}

export default FetchAnnouncements;
