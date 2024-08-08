// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile'); // Redirects to the profile page
    };

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">My Application</h1>
            <div className="navbar-buttons">
                <button onClick={handleProfileClick} className="navbar-button profile-button">
                    Profile
                </button>
                <LogoutButton />
            </div>
        </div>
    );
};

export default Navbar;
