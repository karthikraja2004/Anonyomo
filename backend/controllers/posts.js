const postModel = require('../models/post')
const mongoose = require('mongoose')

const getAllPosts = async (req, res) => {

    try {
        // Since we referenced the posts with user id, we can modify the author with username
        const posts = await postModel.find({}).populate('author', 'username').sort({ createdAt: -1 })
        console.log("posts : " + posts.length)
        res.status(200).json(posts)
    }
    catch (err) {
        res.status(400).json({ message: "Error fetching posts" })
    }

}

const addPost = async (req, res) => {
    const { title, content, category } = req.body
    const userId = req.userId

    if (!title || !content || !category) {
        res.status(400).json({ message: "Missing details" })
    }
    try {
        const newpost = await postModel.create({
            title,
            content,
            category,
            author: userId,
        })

        console.log("post created\n" + newpost)
        res.status(200).json(newpost)


    }
    catch (err) {
        res.status(400).json({ message: 'Error creating post' });
    }
}

const getAllPostsByUserId = async (req, res) => {
    const userId = req.params.userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format" });
    }
    try {
        const posts = await postModel.find({ author: userId }).populate('author', 'username').sort({ createAt: -1 })
        console.log(posts)

        res.status(201).json(posts)
    }
    catch (err) {
        res.status(400).json({ message: "Error fetching posts for user" })
    }
}

const deletePost = async (req, res) => {
    const userId = req.userId
    const postId = req.params.postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId format" });
    }
    try {
        const fetchedPost = await postModel.findOne({ _id: postId })

        if (fetchedPost && fetchedPost.author.toString() === userId) {
            const deletedPost = await fetchedPost.deleteOne({ _id: postId })
            res.status(200).json(deletedPost)
        }
        else res.status(500).json({ message: "Invalid Resource or Unauthorized Access" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updatePost = async (req, res) => {
    const userId = req.userId
    const postId = req.params.postId
    const { title, content, category } = req.body
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId format" });
    }
    try {
        const fetchedPost = await postModel.findById(postId)
        if (!fetchedPost) {
            return res.status(404).json({ message: "post not found" })
        }

        if (fetchedPost.author.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        if (title) fetchedPost.title = title
        if (content) fetchedPost.content = content
        if (category) fetchedPost.category = category
        fetchedPost.updatedAt = Date.now()

        const updatedPost = await fetchedPost.save()
        res.status(200).json({ message: "Successfully updated", updatedPost })


    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getByPostId = async (req, res) => {
    const postId = req.params.postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid postId format" });
    }

    try {
        const fetchedPost = await postModel.findById(postId).populate('author', 'username').populate('comments.commentor', 'username');
        if (fetchedPost) res.status(200).json(fetchedPost)
        else res.status(404).json({ message: "Invalid post " })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }


}

const toggleVote = (voteType) => {

    return async (req, res) => {
        const userId = req.userId
        const postId = req.params.postId

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            res.status(400).json({ message: "Invalid post id format" })
        }
        try {
            const fetchedPost = await postModel.findById(postId)

            if (!fetchedPost) {
                res.status(404).json({ message: "Post not found" })
            }
            const userVoteIndex = fetchedPost[voteType].indexOf(userId);

            if (userVoteIndex !== -1) {
                // User has already voted, remove the vote
                fetchedPost[voteType].splice(userVoteIndex, 1);
            } else {
                // User has not voted yet, add the vote
                fetchedPost[voteType].push(userId);
            }

            const updatedPost = await fetchedPost.save();
            return res.status(200).json({
                [voteType]: updatedPost[voteType].length,
                updatedPost
            });
        }
        catch (err) {
            return res.status(500).json({ message: err.message });
        }

    }
}

const toggleUpvote = toggleVote('upvotes');
const toggleDownvote = toggleVote('downvotes');

module.exports = { getAllPosts, addPost, getAllPostsByUserId, deletePost, updatePost, getByPostId, toggleUpvote, toggleDownvote }