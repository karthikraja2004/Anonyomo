const express = require('express')
const app = express()
const PORT = 5500

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
const profileRoute = require('./routes/profile')
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
app.use('/api/profile', checkUser, profileRoute)


app.use('/api', authenticationRoute)

app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))