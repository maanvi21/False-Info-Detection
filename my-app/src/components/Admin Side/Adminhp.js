import React, { useState, useEffect, useRef } from "react";
import "./Adminhp.css";
import Button from "../Button";
import AdminNavbar from "./AdminNavbar";
import Announcements from '../Announcements'

const Adminhp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 2;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [title]);



  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : null);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setSelectedFile(null);
  };

  const postAnnouncement = async () => {
    if (!title.trim()) {
      alert("Please enter an announcement");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/post-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: title,
          description:description,
         }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Update local announcements array with the new announcement
      
        alert("Announcement added successfully to both MongoDB and CSV!");
        setTitle("");
        setDescription("");
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
            <input
              type="text"
              placeholder="Enter Title..."
              className="post-title-input"
              onChange={handleTitleChange}
              value={title}
            />
            <textarea
              placeholder="Enter Description..."
              className="post-description-input"
              onChange={handleDescriptionChange}
              value={description}
            />

            {/* Attach File Section */}
            <div className="attach-container">
              <label className="attach-label">
                📎 Attach File
                <input type="file" onChange={handleFileChange} />
              </label>
              {selectedFile && <p className="file-name">Attached: {selectedFile}</p>}
            </div>

            {/* Buttons */}
            <div className="button-group">
              <Button text="POST" onClick={postAnnouncement} />
              <Button text="DELETE" onClick={clearInputs} className="delete-button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhp;
