const userModel = require('../models/user')

const getProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password'); // Exclude the password from the response

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = { getProfile }