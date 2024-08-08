const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error('Token verification failed:', err);
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user = await userModel.findById(decodedToken.id);
            if (user) {
                req.userId = decodedToken.id; // Set the user ID in the request object
                next();
            } else {
                res.status(401).json({ message: 'User not found' });
            }
        });
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

module.exports = { checkUser };
