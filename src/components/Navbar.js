import React from 'react'
import { Link } from 'react-router-dom';
import "../App.css";
import '@fontsource/roboto/300.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/welcome">Select Quiz</Link></li>
            <li><Link to="/user">Log In</Link></li>
            <li><Link to="/login">Sign Up</Link></li>
            </ul>
        </div>
    )
}

export default Navbar
