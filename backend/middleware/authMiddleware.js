const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                req.userAccessed = null
                next()
            }
            else {
                let user = await userModel.findById(decodedToken.id)
                if (!user) {
                    return res.status(401).send("Not authorized to access, Access Denied")
                }

                req.token = decodedToken
                console.log("valid User" + " " + decodedToken.username)
                next()
            }
        })
    }
}

module.exports = { checkUser }