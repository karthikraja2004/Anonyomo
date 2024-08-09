import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import CreatePost from '../CreatePost/CreatePost';
import MarkdownPost from '../MarkdownPost/MarkdownPost';
import { BiUpvote,BiSolidUpvote } from "react-icons/bi";
import './Feed.css';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };
    const [mdPosts, setMdPosts] = useState([])

    const addMdPost = (newPost) => {
        setMdPosts([newPost,...mdPosts])
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

            <h2>Optional Markdown Post  </h2>
            <MarkdownPost addMdPost={addMdPost} />
            <div className="md-posts-list">
                {mdPosts.map( (post,index) => (
                    <div key={index} className="post-item">
                    <h3>{post.title}</h3>
                    <hr></hr>
                    <strong>Category</strong> <i>{post.category}</i>
                    <ReactMarkdown>{post.markdown}</ReactMarkdown>
                    {/* add upvote toggle feature */}
                </div>
                )
                    
                )}
            
            </div>
            

        </div>
    );
};

export default Feed;
