import React, { useState } from 'react'
import { BiUpvote,BiSolidUpvote } from "react-icons/bi";

function MarkdownPost() {
    const [title,setTitle] = useState("")
    const [markdown, setMarkdown] =  useState("")

  return (
    <>
    <div className="create-mdPost">
        <form>
            <input type="text" name = 'title' value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea name='content' value={markdown} onChange={e => setMarkdown(e.target.value)}
            placeholder='feed me' >                
            </textarea>
            <select name="category" id="category">
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