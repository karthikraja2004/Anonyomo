const router = require('express').Router()

const { getAllPosts, addPost, getAllPostsByUserId, deletePost, updatePost, getByPostId, toggleUpvote, toggleDownvote } = require('../controllers/posts')
const { addComment } = require('../controllers/comments')
router.get('/', getAllPosts)
router.post('/', addPost)

router.get('/:postId', getByPostId)
router.delete('/:postId', deletePost)
router.patch('/:postId', updatePost)

router.post('/:postId/upvote', toggleUpvote)
router.post('/:postId/downvote', toggleDownvote)

router.get('/users/:userId', getAllPostsByUserId)

router.post('/:postId/addComment', addComment)

module.exports = router