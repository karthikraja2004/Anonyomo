const signupPost = (req, res) => {
    res.send("signup route")
}

const loginPost = (req, res) => {
    res.send("login route")
}

module.exports = { loginPost, signupPost }
