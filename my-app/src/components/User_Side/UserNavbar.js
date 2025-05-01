import React from 'react'
import { useNavigate } from 'react-router-dom'
function UserNavbar() {
    const navigate=useNavigate();
    const navToAbout=()=>{
navigate('/about');
    }

    const navToHome=()=>{
        navigate('/')
    }
    const navToContact=()=>{
      navigate('/contact')
  }
  const navToLogout=()=>{
    navigate('/')
}
  return (
    <div>

      {/* Navigation Bar */}
      <nav className="navigation">
        <div className="nav-item"  onClick={navToHome}>HOME</div>
        <div className="nav-menu">
          <div className="nav-item" onClick={navToAbout}>ABOUT</div>
        
          <div className="nav-item" onClick={navToContact}>CONTACT</div>
          <div className="nav-item" onClick={navToLogout}>LOGOUT</div>
        </div>
      </nav>
      </div>
  )
}

export default UserNavbar
