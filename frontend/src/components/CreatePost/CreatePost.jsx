import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ addPost }) => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text && !image) 
            return;
        const newPost = { text, image };
        addPost(newPost);
        setText('');
        setImage(null);
    };

    return (
        <div className="create-post">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What's on your mind?"
                ></textarea>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
