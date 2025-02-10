import React from 'react';
import './Homepage.css';
import { useNavigate } from "react-router-dom";
import Button from '../Button';

export default function Homepage() {
    const navigate = useNavigate();

    const studentLogin = () => {
       
        navigate('/studenthome');
    };

    const adminLogin = () => {
       
        navigate('/adminhome');
    };

    
    return (
        <>
            <div className='container'>
                <div className='title'>Welcome back, User!</div>
                <div className='text1'>What would you like to login as?</div>
                
                <div className='button-group'>
                    <Button text='Student' onClick={studentLogin} />
                    <Button text='Admin' onClick={adminLogin} />
                </div>

              
            </div>
        </>
    );
}
