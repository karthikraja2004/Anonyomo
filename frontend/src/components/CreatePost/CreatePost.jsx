import React, { useState ,useEffect} from 'react';
import './CreatePost.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreatePost = () => {
    const [formData,setFormData]=useState({
        title:'',
        content:'',
        category:'',
    });

    const {title,content,category}=formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit=async e=>{
        e.preventDefault();

        if(!title || !content || !category)
        {
            toast.error('Please fill all the fields');
            return;
        }
        try{
            const config = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };
            const body = JSON.stringify({ title, content, category });
            const res = await axios.post('http://localhost:5500/api/posts/addpost', body, config);
            toast.success('Post created successfully!');
            console.log('Post created:', res.data);

            setFormData({
                title: '',
                content: '',
                category: '',
            });
        }catch(err)
        {
            toast.error('Error creating post: ' + (err.response?.data.message || 'Unknown error'));
            console.error('Create post error:', err.response?.data);
        }
    };

    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={onSubmit} className="create-post-form">
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                        placeholder="Enter the post title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={content}
                        onChange={onChange}
                        required
                        placeholder="Write your post content"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={category}
                        onChange={onChange}
                        required
                        placeholder="Enter the post category"
                    />
                </div>
                <button type="submit" className="submit-btn">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
