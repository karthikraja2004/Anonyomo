import React, { useState,useEffect } from 'react';
import './Feed.css';
import axios from 'axios';
import Post from '../Post/Post';
const Feed = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts=async()=>{
        try{
            const res=await axios.get('http://localhost:5500/api/posts/', { withCredentials: true });
            setPosts(res.data);
        }
        catch (err) {
            console.error('Error fetching posts:', err.response?.data || err.message);
        }
    };
    fetchPosts();
    },[]);

    

      
    return (
<div className="feed-container">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>  
    );
};

export default Feed;
