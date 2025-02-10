import React from 'react';
import './About.css';
import UserNavbar from '../User_Side/UserNavbar';

const About = () => {
  return (
    <div className="about-container">
      {/* Navigation Bar */}
      <UserNavbar/>

      <div className="about-content">
        <h1 className="project-title">Fake News Detection System</h1>
        
        <div className="content-grid">
          {/* Abstract Card */}
          <div className="info-card">
            <h2>Abstract</h2>
            <p>In the age of digital information, the spread of misleading or inaccurate information related to the academic curriculum within college autonomy models can significantly affect students' decision-making and academic performance. As students increasingly rely on online platforms for accessing academic updates, distinguishing credible information from potentially misleading content has become a major challenge.</p>
          </div>

          {/* Architecture Card */}
          <div className="info-card">
            <h2>System Architecture</h2>
            <p>The system utilizes a specialized fake news dataset processed with NLP techniques including:</p>
            <ul>
              <li>Tokenization</li>
              <li>TF-IDF</li>
              <li>Word embeddings</li>
            </ul>
            <p>Our architecture includes:</p>
            <ul>
              <li>React frontend for user input collection</li>
              <li>Node.js + Express backend for request processing</li>
              <li>MongoDB for dataset and user information storage</li>
            </ul>
          </div>

          {/* Methodology Card */}
          <div className="info-card">
            <h2>Methodology</h2>
            <p>This project provides a practical tool to verify the authenticity of news and minimize the spread of misinformation, particularly within the new academic autonomy model. We've developed a web-based application leveraging NLP for authenticity detection.</p>
          </div>

          {/* Conclusion Card */}
          <div className="info-card">
            <h2>Conclusion</h2>
            <p>While fake news remains a major challenge in the digital age, Natural Language Processing (NLP) provides us with a promising solution for its detection and mitigation. NLP models analyze given data using techniques like sentiment analysis and semantic analysis to detect patterns and inconsistencies in the content.</p>
          </div>

          {/* Team Card */}
          <div className="info-card team-card">
            <h2>Project Team</h2>
            <div className="team-members">
              <p>Riya Raju (1023234)</p>
              <p>Vaidehi Sankaye (1023239)</p>
              <p>Maanvi Shadakshari (1023247)</p>
              <p>Rhea Varghese (1023260)</p>
            </div>
          </div>

          {/* Institute Card */}
          <div className="info-card institute-card">
            <h2>Institute</h2>
            <p>FR. C RODRIGUES INSTITUTE OF TECHNOLOGY, VASHI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;