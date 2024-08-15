// src/components/Navbar.jsx
import React,{useState,useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../Logout/LogoutButton';
import { FaPen } from 'react-icons/fa';
import './Navbar.css';
import axios from 'axios';


const Navbar =() => {
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        
        const fetchColleges = async () => {
            try {
                const res = await axios.get('http://localhost:5500/api/collegename'); 
                setColleges(res.data);
            } catch (err) {
                console.error('Error fetching colleges:', err.response?.data);
            }
        };

        fetchColleges();
    }, []);


    const handleCollegeChange=(e)=>{
        const collegeName=e.target.value;
        setSelectedCollege(collegeName);
        console.log(collegeName);
        navigate(collegeName === 'all' ? '/feed': `/feed/${collegeName}`);
    }
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

            <div className="college-dropdown">
                   
                    <select
                        id="college"
                        value={selectedCollege}
                        onChange={handleCollegeChange}                        
                    >
                        <option value="">Select a college</option>
                        <option value="all">All colleges</option>
                        {colleges.map((college) => (
                            <option key={college._id} value={college.name}>
                                {college.name}
                            </option>
                            
                        ))}
                    </select>
                </div>
                <button onClick={handleCreatePostClick} className="create-post-button">
                
                <FaPen className="create-post-icon" />
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
