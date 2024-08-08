// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axios.get('http://localhost:5500/api/profile', { withCredentials: true });
                setProfileData(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="profile-section">
                {profileData ? (
                    <button onClick={() => navigate('/profile')} className="profile-button">
                        View Profile
                    </button>
                ) : (
                    <p>No profile data available.</p>
                )}
            </div>
            <h2 className="dashboard-heading">Welcome to Your Dashboard</h2>
            {/* Other dashboard content */}
        </div>
    );
};

export default Dashboard;
