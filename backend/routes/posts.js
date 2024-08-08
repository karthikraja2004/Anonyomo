const router = require('express').Router()

const { getAllPosts, addPost } = require('../controllers/posts')
router.get('/', getAllPosts)
router.post('/', addPost)




module.exports = router