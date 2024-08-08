const router = require('express').Router()

const { getAllPosts, addPost, getAllPostsByUserId, deletePost, updatePost } = require('../controllers/posts')
router.get('/', getAllPosts)
router.post('/', addPost)
router.get('/:userId', getAllPostsByUserId)
router.delete('/:postId', deletePost)
router.patch('/:postId', updatePost)




module.exports = router