import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown,FaComment } from 'react-icons/fa';
import './Vote.css';
import { useNavigate } from 'react-router-dom';
const Vote = ({ postId, initialUpvotes, initialDownvotes ,commentCount}) => {
    const [upvotes, setUpvotes] = useState(initialUpvotes);
    const [downvotes, setDownvotes] = useState(initialDownvotes);
    const [userVote, setUserVote] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserVote = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/posts/${postId}/vote/user-vote`, { withCredentials: true });
                setUserVote(res.data.voteType);
            } catch (err) {
                console.log('Error fetching user vote:', err.response?.data || err.message);
            }
        };
        fetchUserVote();
    }, [postId]);

    const handleVote = async (voteType) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/api/posts/${postId}/vote/${voteType}`, {}, { withCredentials: true });
            console.log(res.data);
            if (voteType === 'upvote') {
                setUpvotes(res.data.upvotes);
                if (userVote === 'downvote') {
                    setDownvotes((prev) => Math.max(0, prev - 1));
                }
                setUserVote(userVote === 'upvote' ? null : 'upvote');
            } else if (voteType === 'downvote') {
                setDownvotes(res.data.downvotes);
                if (userVote === 'upvote') {
                    setUpvotes((prev) => Math.max(0, prev - 1));
                }
                setUserVote(userVote === 'downvote' ? null : 'downvote');
            }
        } catch (err) {
            console.log('Error handling vote:', err.response?.data || err.message);
        }
    };

    const handleCommentClick=()=>{
        navigate(`/posts/${postId}`);
    }

    return (
        <div className="vote-container">
            <div className="vote-item">
                <FaThumbsUp
                    className={`vote-icon ${userVote === 'upvote' ? 'active' : ''}`}
                    onClick={() => handleVote('upvote')}
                />
                <span>{upvotes >= 0 ? upvotes : 0}</span>
            </div>
            <div className="vote-item">
                <FaThumbsDown
                    className={`vote-icon ${userVote === 'downvote' ? 'active' : ''}`}
                    onClick={() => handleVote('downvote')}
                />
                <span>{downvotes >= 0 ? downvotes : 0}</span>
            </div>
            <div className="vote-item">
                <FaComment className="comment-icon" onClick={handleCommentClick}  />
              
            </div>
        </div>
    );
};

export default Vote;
