import React, { useEffect, useState } from 'react';
import './CreatePost.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
useNavigate
const CreatePost = () => {
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
        title:'',
        content:'',
        category:'',
    });
    const[categories,setCategories]=useState([]);

    const {title,content,category}=formData;

    useEffect(()=>{
        const fetchCategories=async()=>{
            try{
                const res=await axios.get("http://localhost:5500/api/categories");
                setCategories(res.data);
            }catch(err)
            {
                toast.error('Error fetching categories');
                console.error('Fetch categories error:', err.response?.data);
            }
        };
        fetchCategories();
    },[]);
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
            const res = await axios.post('http://localhost:5500/api/posts/', body, config);
            toast.success('Post created successfully!');
            console.log('Post created:', res.data);

            setFormData({
                title: '',
                content: '',
                category: '',
            });
            navigate('/feed');
            
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
                    <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={onChange}
                    required
                    >
                        <option value="">Select a category</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-btn">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
