const router = require('express').Router()
const { getProfile } = require('../controllers/profile')
router.get('/', getProfile)
module.exports = router