import React, { useState } from 'react';
import CreatePost from '../CreatePost/CreatePost';
import './Feed.css';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="feed-container">
            <CreatePost addPost={addPost} />
            <div className="posts-list">
                {posts.map((post, index) => (
                    <div key={index} className="post-item">
                        <p>{post.text}</p>
                        {post.image && <img src={URL.createObjectURL(post.image)} alt="Post" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed;
