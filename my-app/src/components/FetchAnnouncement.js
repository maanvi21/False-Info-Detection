import React from 'react';
import './FetchAnnouncement.css';
function FetchAnnouncements() {
  // Sample announcement data (hard-coded for frontend-only example)
  const announcement = {
    id: 1,
    title: "Spring Semester Registration Deadline Extended",
    date: "March 20, 2025",
    description: [
      "Dear Students,",
      "Due to the high volume of registration requests and system maintenance last weekend, the Spring semester registration deadline has been extended by one week. The new deadline is March 30, 2025.",
      "Please review the updated academic calendar and registration guidelines in the attached files. Note that all registration fees remain the same, but additional course options have been added for certain departments.",
      "If you have any questions regarding the registration process, please contact the Registrar's Office at registrar@college.edu.",
      "Thank you for your patience and understanding.",
      "Best regards,\nOffice of Academic Affairs"
    ],
    files: [
      {
        id: 1,
        name: "Updated_Spring_Calendar_2025.pdf",
        icon: "📅",
      },
      {
        id: 2,
        name: "Registration_Guidelines_2025.pdf",
        icon: "📄",
      },
      {
        id: 3,
        name: "New_Course_Offerings.xlsx",
        icon: "📋",
      }
    ]
  };

  const handleDownload = (fileName) => {
    // In a real app, this would handle the actual file download
    // For this frontend example, we'll just log the action
    console.log(`Downloading file: ${fileName}`);
    alert(`Download started for: ${fileName}`);
  };

  return (
    <div className="container">
      <header>
        <h1>College Information Verifier</h1>
        <div className="subtitle">Your trusted platform for verifying academic information</div>
      </header>

      <div className="announcement-card">
        <h2 className="announcement-title">{announcement.title}</h2>
        <div className="announcement-date">Posted on: {announcement.date}</div>
        
        <div className="announcement-description">
          {announcement.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="file-section">
          <h3>Attached Files</h3>
          {announcement.files.map((file) => (
            <div className="file-item" key={file.id}>
              <div className="file-icon">{file.icon}</div>
              <div className="file-name">{file.name}</div>
              <button 
                className="download-btn"
                onClick={() => handleDownload(file.name)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <a href="#" className="back-btn">← Back to Announcements</a>
    </div>
  );
}

export default FetchAnnouncements;