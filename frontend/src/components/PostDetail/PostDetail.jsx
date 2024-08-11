import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Vote from '../Vote/Vote';
import Post from '../Post/Post'; // Ensure you import the Post component
import './PostDetail.css';
import axios from 'axios';

const PostDetail = () => {
    const { postId } = useParams();
    console.log('Post ID:', postId); // Check the postId value
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`http://localhost:5500/api/posts/${postId}`, { withCredentials: true });
                console.log('Fetched Post:', res.data); // Check the fetched data
                setPost(res.data);
                setComments(res.data.comments);
            } catch (err) {
                console.error('Error fetching post:', err.response?.data || err.message);
            }
        };
        fetchPost();
    }, [postId]);

    if (!post) {
        return <p>Loading...</p>; // Or any loading indicator
    }

    const handleCommentSubmit = async () => {
        const text = comment;
        try {
            const res = await axios.post(`http://localhost:5500/api/posts/${postId}/addComment`, { text }, { withCredentials: true });
            // Add the new comment to the state
            setComments(prevComments => [res.data.comment, ...prevComments]);
            setComment(""); // Clear the comment input
        } catch (err) {
            console.error('Error submitting comment:', err.response?.data || err.message);
        }
    };

    console.log(comment);

    return (
        <>
            <h2>{postId}</h2>
            <Post post={post} />
            <h4>Comments</h4>
            <ul>
                {comments && comments.map(c => (
                    <li key={c._id}>{c.text}</li>
                ))} 
            </ul>
            <div className="comment-box">
                <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleCommentSubmit}>Submit Comment</button>
            </div>
        </>
    );
};

export default PostDetail;
