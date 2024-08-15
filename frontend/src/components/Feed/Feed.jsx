import React, { useState,useEffect } from 'react';
import './Feed.css';
import axios from 'axios';
import Post from '../Post/Post';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Feed = () => {
    const{collegeName}=useParams();
    const [posts, setPosts] = useState([]);
    const[sortByUpvotes,setSortByUpvotes]=useState(false);
    useEffect(() => {
        const fetchPosts = async () => {
            const url = collegeName 
              ? `${API_BASE_URL}/api/posts/college/${encodeURIComponent(collegeName)}`
              : `${API_BASE_URL}/api/posts`;
    
            console.log('Fetching from URL:', url);
            
            try {
                const res = await axios.get(url, {
                    withCredentials: true,
                    
                });
                setPosts(res.data);
            } catch (err) {
                toast.error('Not Available' + (err.response?.data.message || 'Unknown error'));
                console.error('Error fetching posts:', err.response?.data || err.message);
            }
        };
    
        fetchPosts();
    }, [collegeName]);
    
    const toggleSortUpvotes=()=>{
        setSortByUpvotes(!sortByUpvotes);
    }

    const sortedPosts=[...posts].sort((a,b)=>{
        if(sortByUpvotes)
            {
            return b.upvotes.length-a.upvotes.length;
        }
        return 0;
    });

    return (<div className="feed-container">
        <div className="toggle-container">
            <span className="toggle-label">Sort by Upvotes</span>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={sortByUpvotes}
                    onChange={toggleSortUpvotes}
                />
                <span className="slider"></span>
            </label>
        </div>
        {sortedPosts.map((post) => (
            <Post key={post._id} post={post} />
        ))}
    </div>
    );
};

export default Feed;
