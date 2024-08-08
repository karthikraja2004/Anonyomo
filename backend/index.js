const express = require('express')
const app = express()
const PORT = 5500
const userModel = require('./models/user')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

const corsOptions = {
    origin: 'http://localhost:5173', // Specify your frontend origin here
    credentials: true,
};
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions));

const authenticationRoute = require('./routes/authentication')
const { checkUser } = require('./middleware/authMiddleware')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection successful")
    })
    .catch((err) => console.log("database connection failed", err))


app.get('/', (req, res) => {
    res.send("Backend Route")
})

// auth route
app.use('/api/auth', authenticationRoute)

// Protected route
app.get('/api/profile', checkUser, async (req, res) => {
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
})


app.use('/api', authenticationRoute)

app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))