const postModel = require('../models/post')

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
module.exports = { getAllPosts, addPost }