import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Post from '../Post/Post';
import './PostDetail.css';
import axios from 'axios';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5500/api/posts/${postId}`, { withCredentials: true });
                setPost(res.data);
                setComments(res.data.comments);
            } catch (err) {
                console.error('Error fetching post:', err.response?.data || err.message);
            }
        };
        fetchPost();
    }, [postId]);

    if (!post) {
        return <p>Loading...</p>;
    }

    const handleCommentSubmit = async () => {
        const text = comment;
        try {
            const res = await axios.post(`http://localhost:5500/api/posts/${postId}/addComment`, { text }, { withCredentials: true });
            setComments(prevComments => [res.data.comment, ...prevComments]);
            setComment("");
        } catch (err) {
            console.error('Error submitting comment:', err.response?.data || err.message);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5500/api/posts/${postId}/comments/${commentId}`, { withCredentials: true });
            setComments(comments.filter(c => c._id !== commentId));
        } catch (err) {
            console.error('Error deleting comment:', err.response?.data || err.message);
        }
    };

    const formatDate = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        const diffTime = Math.abs(now - commentDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    return (
        <>
            {/* Pass comments as a prop to the Post component */}
            <Post post={post} comments={comments} />
            <div className="comment-box">
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
            <section className="comments-section">
                <h4>Comments</h4>
                {comments.length > 0 ? (
                    comments.map(c => (
                        <div key={c._id} className="comment-card">
                            <div className="comment-content">
                                <p className="comment-text">{c.text}</p>
                                <p className="commentor-username"><strong>{c.commentor.username}</strong></p>
                                <p className="comment-date">{formatDate(c.createdAt)}</p>
                            </div>
                            <button className="delete-comment-button" onClick={() => handleCommentDelete(c._id)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </section>
        </>
    );
};

export default PostDetail;
