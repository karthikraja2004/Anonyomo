import React, { useState,useEffect } from 'react';
import './Feed.css';
import axios from 'axios';
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
            <h2>Posts Feed</h2>
            <div className="posts-list">
                {posts.length === 0 ? (
                    <p>No posts available</p>
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <small>Category: {post.category}</small>
                            <br />
                            <small>By: {post.author.username}</small>
                            <br />
                            <small>Posted on: {new Date(post.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
