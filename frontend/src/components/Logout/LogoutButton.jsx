import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogoutButton.css';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogoutClick = async () => {
        try {
            await axios.post(`${API_BASE_URL}/api/logout`, {}, { withCredentials: true });
            navigate('/login'); // Redirect to the login page after logout
        } catch (err) {
            console.error('Failed to logout', err);
            // Optionally, show an error message to the user
        }
    };

    return (
        <button onClick={handleLogoutClick} className="logout-button">
            Logout
        </button>
    );
};

export default LogoutButton;
