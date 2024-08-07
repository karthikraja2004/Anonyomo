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

const loginPost = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.login(email, password)
        const token = createToken(user._id, user.username)
        res.cookie('jwt', token)

        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json({ message: "username or password does not exist" })
    }
}

module.exports = { loginPost, signupPost }
