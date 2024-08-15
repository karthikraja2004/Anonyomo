const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (id, username) => {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "2 days"
    })
}
const signupPost = async (req, res) => {
    const { username, email, password, confirmPassword, name, mobile, collegeName, dob, isOrganization } = req.body;
    console.log(username);
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }
        const newUser = await userModel.create({
            username, email, password, confirmPassword, name, mobile, collegeName, dob, isOrganization
        });
        const token = createToken(newUser._id, newUser.username);
        res.cookie('jwt', token);

        res.status(201).json(newUser);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ message: "user not created" })
    }

}

const loginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.login(email, password)
        const token = createToken(user._id, user.username)
        res.cookie('jwt', token, { httpOnly: true });
        res.status(200).json(user)
    }
    catch (err) {
        res.status(400).json({ message: "username or password does not exist" })
    }
}

const logoutPost = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, httpOnly: true });
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { loginPost, signupPost, logoutPost }
