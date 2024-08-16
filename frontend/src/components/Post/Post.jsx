import React from 'react'
import Vote from '../Vote/Vote'
import ReactMarkdown from 'react-markdown';
import './Post.css';
const Post = ({post}) => {
  const {username,isOrganization,collegeName} = post.author
  return (
    <div className="post-card">
    <div className="post-header">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-author">by {username}
      {isOrganization && (
        <>
        <span className="org-tag">ORG</span>
      <span className="college-name"> ({collegeName})</span>
        </>
        )}
      
      </p>
    </div>
    <div className="post-content">
      <ReactMarkdown>{post.content}</ReactMarkdown>
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