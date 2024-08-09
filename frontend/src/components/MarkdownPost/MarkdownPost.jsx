import React, { useState } from 'react'


function MarkdownPost({addMdPost}) {
    const [title,setTitle] = useState("")
    const [markdown, setMarkdown] =  useState("")
    const [category, setCategory] = useState("Misc")

    const handleSubmit = (e) =>{
        e.preventDefault()
        if (!title && !markdown && !category) 
            return;
        const newPost = {title, markdown, category };
        addMdPost(newPost);
        setText('');
        setMarkdown('');
        setCategory("Misc")
    }
  return (
    <>
    <div className="create-post">
        <form onSubmit={handleSubmit}>
            <input type="text" name = 'title' value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea name='content' value={markdown} onChange={e => setMarkdown(e.target.value)}
            placeholder='feed me' >                
            </textarea>
            <select name="category" id="category" value={category} onChange={e => setCategory(e.target.value)} id="category">
                <option value="Misc">Misc</option>
                <option value="Issues">Issues</option>
                <option value="Academics">Academics</option>
                <option value="Updates">Updates</option>
                <option value="Career">Career</option>
            </select>
            <button type ="submit"> Post </button>
        </form>
    </div>
    </>
  )
}

export default MarkdownPost