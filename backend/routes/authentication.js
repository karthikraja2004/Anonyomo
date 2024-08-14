const router = require('express').Router()
const { loginPost, signupPost, logoutPost } = require('../controllers/authentication')
const colleges=require('../data/CollegeName');
router.post('/login', loginPost)
router.post('/signup', signupPost)
router.post('/logout', logoutPost)
router.get('/collegename',(req,res)=>{
    res.json(colleges);
});
module.exports = router