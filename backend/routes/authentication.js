const router = require('express').Router()
const { loginPost, signupPost } = require('../controllers/authentication')
router.post('/login', loginPost)
router.post('/signup', signupPost)

module.exports = router