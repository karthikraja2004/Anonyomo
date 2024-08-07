const router = require('express').Router()

const { loginPost, signupPost } = require('../controllers/authentication')
router.get('/login', loginPost)
router.get('/signup', signupPost)

module.exports = router