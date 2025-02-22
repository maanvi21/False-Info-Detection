import React, { useState, useEffect, useRef } from "react";
import "./Adminhp.css";
import Button from "../Button";
import AdminNavbar from "./AdminNavbar";
import Announcements from '../Announcements';

const Adminhp = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  
  const scrollRef = useRef(null);

  // Fetch announcements when component mounts and after posting/deleting
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://localhost:5000/display-announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("❌ Error fetching announcements:", error);
      alert("❌ An error occurred while fetching the announcements.");
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 2;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [announcements]);

  const handleTitleChange = (e) => setNewTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file ? file.name : null);
  };

  const clearInputs = () => {
    setNewTitle("");
    setDescription("");
    setSelectedFile(null);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    // Modal animation
    setTimeout(() => {
      const modal = document.querySelector('.modal-content');
      if (modal) {
        modal.classList.add('show');
      }
    }, 10);
  };

  const closeDeleteModal = () => {
    document.querySelector('.modal-content').classList.remove('show');
    setTimeout(() => {
      setShowDeleteModal(false);
      setSelectedAnnouncement(null);
    }, 300);
  };

  const deleteAnnouncement = async () => {
    if (!selectedAnnouncement) return;
   
    try {
      const response = await fetch(`http://localhost:5000/delete-announcement/${selectedAnnouncement._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchAnnouncements(); // Refresh the announcements list
        alert("Announcement deleted successfully!");
        closeDeleteModal();
      } else {
        const data = await response.json();
        alert(`Failed to delete announcement: ${data.error}`);
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("❌ An error occurred while deleting the announcement.");
    }
  };

  const postAnnouncement = async () => {
    if (!newTitle.trim()) {
      alert("Please enter an announcement title");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/post-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title: newTitle,
          description: description,
          file: selectedFile,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        await fetchAnnouncements(); // Refresh the announcements list
        alert("Announcement added successfully!");
        clearInputs();
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
        <Announcements />

        <div className="card post-card">
          <h2 className="post-header">Post Your Announcements</h2>
          <div className="post-content">
            <input
              type="text"
              placeholder="Enter Title..."
              className="post-title-input"
              onChange={handleTitleChange}
              value={newTitle}
            />
            <textarea
              placeholder="Enter Description..."
              className="post-description-input"
              onChange={handleDescriptionChange}
              value={description}
            />

            <div className="attach-container">
              <label className="attach-label">
                📎 Attach File
                <input type="file" onChange={handleFileChange} />
              </label>
              {selectedFile && <p className="file-name">Attached: {selectedFile}</p>}
            </div>

            <div className="button-group">
              <Button text="POST" onClick={postAnnouncement} />
              <Button text="DELETE" onClick={openDeleteModal} className="delete-button" />
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Select Announcement to Delete</h3>
            <ul>
              {announcements.map((announcement) => (
                <li key={announcement._id}>
                 <button
        onClick={() => {
          console.log("Selecting:", announcement);
          setSelectedAnnouncement(announcement);
        }}
        className={selectedAnnouncement?._id === announcement._id ? "selected" : ""}
      >
        {announcement.title}
      </button>
                </li>
              ))}
            </ul>
            <div className="modal-actions">
              <Button text="CANCEL" onClick={closeDeleteModal} />
              <Button text="DELETE" onClick={deleteAnnouncement} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Adminhp;