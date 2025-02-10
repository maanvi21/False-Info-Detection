import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import the FontAwesomeIcon component
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import {  useNavigate } from "react-router-dom";

export default function Back() {
    const navigate=useNavigate();
    const backtoHome=()=>{
        navigate('/')
    }
  return (
    <>
      <div className='container'>
        <div className='backbutton'>
            <button className='back_button' onClick={backtoHome}> 
          <FontAwesomeIcon icon={faArrowLeft} /> </button>
        </div>
      </div>
    </>
  );
}
