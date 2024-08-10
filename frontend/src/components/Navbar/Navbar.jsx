// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile'); // Redirects to the profile page
    };
    const handleCreatePostClick = () => {
        navigate('/create-post'); // Navigate to the CreatePost route
      };

    return (
        <div className="navbar-container">
            <h1 className="navbar-title">Anonymo</h1>
            <div className="navbar-buttons">
                <button onClick={handleCreatePostClick} className="create-post-button">
                     Create Post
                </button>
                <button onClick={handleProfileClick} className="navbar-button profile-button">
                    Profile
                </button>
                <LogoutButton />
            </div>
        </div>
    );
};

export default Navbar;
