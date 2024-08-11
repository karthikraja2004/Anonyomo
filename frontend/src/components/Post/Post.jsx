import React from 'react'
import Vote from '../Vote/Vote'
import ReactMarkdown from 'react-markdown';
import './Post.css';
const Post = ({post}) => {
  return (
    <div className="post-card">
    <div className="post-header">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-author">by {post.author.username}</p>
    </div>
    <div className="post-content">
      <p>{post.content}</p>
    </div>
    <div className="post-footer">
      <Vote
        postId={post._id}
        initialUpvotes={post.upvotes.length}
        initialDownvotes={post.downvotes.length}
      />
      
    </div>
  </div>
  );
}

export default Post;