import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import CreatePost from '../CreatePost/CreatePost';
import MarkdownPost from '../MarkdownPost/MarkdownPost';
import './Feed.css';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };
    const [mdPosts, setMdPosts] = useState([])

    const addMdPost = (newPost) => {
        setMdPost([newPost,...mdPosts])
    }

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
            <MarkdownPost addMdPost={addMdPost} />
            

        </div>
    );
};

export default Feed;
