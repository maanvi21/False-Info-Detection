import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AnnouncementDetails.css";

const AnnouncementDetails = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const response = await fetch(`http://localhost:5000/display-announcement/${id}`);
        const data = await response.json();
        setAnnouncement(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching announcement details:", error);
        setLoading(false);
      }
    };

    fetchAnnouncement();
  }, [id]);

  if (loading) return <p>Loading announcement details...</p>;
  if (!announcement) return <p>Announcement not found.</p>;

  return (
    <div className="announcement-details-container">
      <div className="announcement-header">
        <h1>{announcement.title}</h1>
        <p className="announcement-date">📅 {new Date(announcement.date).toDateString()}</p>
      </div>
      <div className="announcement-body">
        <p>{announcement.details}</p>
        {announcement.fileUrl && (
          <a
            href={announcement.fileUrl}
            download
            className="download-button"
          >
            📂 Download Attached File
          </a>
        )}
      </div>
    </div>
  );
};

export default AnnouncementDetails;
