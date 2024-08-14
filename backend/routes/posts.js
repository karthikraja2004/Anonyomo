const router = require('express').Router()

const { getAllPosts, addPost, getAllPostsByUserId, deletePost, updatePost, getByPostId, toggleUpvote, toggleDownvote, getUserVote, getAllPostsByCollege } = require('../controllers/posts')
const { addComment, deleteComment } = require('../controllers/comments')
router.get('/', getAllPosts)
router.post('/', addPost)
router.get('/college', getAllPostsByCollege)

router.get('/:postId', getByPostId)
router.delete('/:postId', deletePost)
router.patch('/:postId', updatePost)

router.post('/:postId/vote/upvote', toggleUpvote)
router.post('/:postId/vote/downvote', toggleDownvote)
router.get('/:postId/vote/user-vote', getUserVote);
router.get('/users/:userId', getAllPostsByUserId)

router.post('/:postId/addComment', addComment)
router.delete('/:postId/comments/:commentId', deleteComment);




module.exports = router