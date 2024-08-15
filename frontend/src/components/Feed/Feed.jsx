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

    useEffect(() => {
        const fetchPosts = async () => {
            const url = collegeName 
              ? `http://localhost:5500/api/posts/college/${encodeURIComponent(collegeName)}`
              : "http://localhost:5500/api/posts";
    
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
    


    

      
    return (
<div className="feed-container">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>  
    );
};

export default Feed;
