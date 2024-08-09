const postModel = require('../models/post')
const mongoose = require('mongoose')
const addComment = async (req, res) => {
    const postId = req.params.postId
    const userId = req.userId
    const { text } = req.body

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId format" });
    }
    if (!text || text.trim() === '') {
        return res.status(400).json({ message: "Comment text cannot be empty" });
    }

    try {
        const fetchedPost = await postModel.findById(postId)
        if (!fetchedPost) {
            return res.status(404).json({ message: "post not found" })
        }

        const newComment = {
            commentor: userId,
            text,
            createdAt: Date.now()
        };
        fetchedPost.comments.push(newComment)
        await fetchedPost.save()

        res.status(201).json({ message: "comment added", comment: newComment })



    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}



module.exports = { addComment }

