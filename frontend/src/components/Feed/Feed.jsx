import React, { useState,useEffect } from 'react';
import './Feed.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Vote from '../Vote/Vote';
const Feed = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

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
            <div className="posts-card">
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
                            <Vote
                            postId={post._id}
                            initialUpvotes={post.upvotes.length}
                            initialDownvotes={post.downvotes.length}
                            />
                        </div>
                    ))
                )}
            </div>
            
        </div>
        
    );
};

export default Feed;
