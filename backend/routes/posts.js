const router = require('express').Router()

const { getAllPosts, addPost, getAllPostsByUserId, deletePost, updatePost, toggleUpvote } = require('../controllers/posts')
router.get('/', getAllPosts)
router.post('/', addPost)

router.delete('/:postId', deletePost)
router.patch('/:postId', updatePost)
router.post('/:postId/upvote', toggleUpvote)
router.post('/:postId/downvote', togg)

router.get('/users/:userId', getAllPostsByUserId)




module.exports = router