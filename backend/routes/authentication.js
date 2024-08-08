const router = require('express').Router()
const { loginPost, signupPost, logoutPost } = require('../controllers/authentication')
router.post('/login', loginPost)
router.post('/signup', signupPost)
router.post('/logout', logoutPost)
module.exports = router