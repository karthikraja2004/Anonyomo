const router = require('express').Router()
const { loginPost, signupPost, logoutPost } = require('../controllers/authentication')
const colleges=require('../data/CollegeName');
const categories=require('../data/Categories');
router.post('/login', loginPost)
router.post('/signup', signupPost)
router.post('/logout', logoutPost)
router.get('/collegename',(req,res)=>{
    res.json(colleges);
});
router.get('/categories',(req,res)=>{
    console.log("Hii")
    res.json(categories);
});
module.exports = router