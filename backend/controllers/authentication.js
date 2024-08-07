const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "2 days"
    })
}
const signupPost = async (req, res) => {
    const newUser = req.body
    console.log(newUser)

    try {
        const existingUser = await userModel.findOne({ username: newUser.username })
        if (existingUser) {
            res.status(401).send("User already Exists")
        }

        const user = await userModel.create(newUser)
        console.log(user)

        const token = createToken(user._id, user.username)
        res.cookie('jwt', token)

        console.log(`token generated ${token}`)
        res.status(201).json(user)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "user not created" })
    }

}

const loginPost = (req, res) => {
    res.send("login route")
}

module.exports = { loginPost, signupPost }
