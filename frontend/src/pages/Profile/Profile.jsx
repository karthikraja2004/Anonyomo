import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {toast}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isAnonymoOn, setIsAnonymoOn] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/profile`, {
                    withCredentials: true,
                });
                setProfileData(res.data);
                setLoading(false);
            } catch (err) {
                toast.error('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleToggle = () => {
        setIsAnonymoOn(!isAnonymoOn);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            <div className="anonymo-toggle">
                <h3>Anonymo is {isAnonymoOn ? 'On' : 'Off'}</h3>
                <label className="switch">
                    <input type="checkbox" checked={isAnonymoOn} onChange={handleToggle} />
                    <span className="slider"></span>
                </label>
            </div>
            {profileData ? (
                <div className="profile-info">
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Username:</strong> {profileData.username}</p>
                    <p><strong>Mobile:</strong> {profileData.mobile}</p>
                    <p><strong>College Name:</strong> {profileData.collegeName}</p>
                    <p><strong>Date of Birth:</strong> {profileData.dob}</p>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
};

export default Profile;
