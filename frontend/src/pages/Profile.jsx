// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css'; // Import the CSS file for styling

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

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
        <div className="profile-container">
            <h2 className="profile-heading">Your Profile</h2>
            {profileData ? (
                <div className="profile-info">
                    <p><strong>Username:</strong> {profileData.username}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Mobile:</strong> {profileData.mobile}</p>
                    <p><strong>College Name:</strong> {profileData.collegeName}</p>
                    <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                    {/* Add more fields if needed */}
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default Profile;
