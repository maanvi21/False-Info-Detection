import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const studentLogin = () => {
       
        navigate('/studentlogin');
    };

    const adminLogin = () => {
       
        navigate('/adminlogin');
    };

    
  return (
    <div className="home-container">
      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="main-title">Welcome to Fake News Detection</h1>
          <p className="subtitle">Your trusted platform for verifying academic information</p>
        </div>

        {/* Login Options */}
        <div className="login-section">
          <h2 className="login-title">Choose your role to continue</h2>
          <div className="login-cards">
            {/* Student Card */}
            <div className="role-card student-card">
              <div className="card-content">
                <div className="icon-container student-icon">
                  👨‍🎓
                </div>
                <h3>Student Portal</h3>
                <p>Access verified academic news and updates</p>
                <button className="login-button" onClick={studentLogin}>Login as Student</button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="role-card admin-card">
              <div className="card-content">
                <div className="icon-container admin-icon">
                  👨‍💼
                </div>
                <h3>Admin Portal</h3>
                <p>Manage content and user access</p>
                <button className="login-button" onClick={adminLogin}>Login as Admin</button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="features-title">Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Real-time Detection</h3>
              <p>Advanced NLP algorithms for instant verification</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>High Accuracy</h3>
              <p>Precise analysis using multiple verification parameters</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Platform</h3>
              <p>Protected access and data security</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Access</h3>
              <p>User-friendly interface for quick verification</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>FR. C RODRIGUES INSTITUTE OF TECHNOLOGY © 2024</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;