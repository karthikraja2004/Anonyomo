import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        const fetchPost=async()=>{

            try{
                const res=await axios.get(`http://localhost:5500/api/posts/${postId}`,{withCredentials:true});
                setPost(res.data);
                console.log(res.data);
                setComments(res.data.comments);
            }
            catch(err)
            {
                console.log('Error fetching post:',err.response?.data||err.message);
            }

        };
        fetchPost();
    },[postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5500/api/posts/${postId}/addcomment`, { text: newComment }, { withCredentials: true });
            setComments([res.data, ...comments]);  // Add the new comment to the top of the list
            setNewComment('');
        } catch (err) {
            console.log('Error submitting comment:', err.response?.data || err.message);
        }
    };
    return(
        <div className="post-detail-container">
            <div className="post-detail">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            <div className="comments-section">
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                <div className="comments-list">
                    {comments.map((comment) => (
                        <div key={comment._id} className="comment-item">
                            <p>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
};
export default PostDetail;