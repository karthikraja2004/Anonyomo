const router = require('express').Router()

const { getAllPosts, addPost, getAllPostsByUserId, deletePost, updatePost, toggleUpvote } = require('../controllers/posts')
router.get('/', getAllPosts)
router.post('/', addPost)
router.get('/:userId', getAllPostsByUserId)
router.delete('/:postId', deletePost)
router.patch('/:postId', updatePost)
router.post('/:postId/upvote', toggleUpvote)




module.exports = router