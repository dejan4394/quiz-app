import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css";
import '@fontsource/roboto/300.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
            <li><Link to="/welcome">Home</Link></li>
            <li><Link to="/user">Profile</Link></li>
            <li><Link to="/login">Quiz</Link></li>
                
            </ul>
        </div>
    )
}

export default Navbar
