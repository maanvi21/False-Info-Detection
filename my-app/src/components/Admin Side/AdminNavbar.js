import React from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminNavbar.css'
export default function AdminNavbar() {
    const navigate= useNavigate();
    const navToStuRegister=()=>{
navigate('/registerstudent')
    }
    const navToHome=()=>{
        navigate('/')
    }
    const navToAbout=()=>{
      navigate('/about')
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
        <div className="nav-item" onClick={navToHome}>HOME</div>
        <div className="nav-menu">
          <div className="nav-item" onClick={navToAbout}>ABOUT</div>
          <div className="nav-item" onClick={navToStuRegister}>ADD STUDENT</div>
          <div className="nav-item" onClick={navToContact}>CONTACT</div>
          <div className="nav-item" onClick={navToLogout}>LOGOUT</div>
        </div>
      </nav>
      </div>
    
  )
}
