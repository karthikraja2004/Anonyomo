const express = require('express')
const app = express()
const PORT = 5500

const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()



app.use(express.json())
app.use(cookieParser())

const allowedOrigins = [
    'https://anonyomo.vercel.app',
    'https://anonyomo-c1in.vercel.app'
];
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));


const authenticationRoute = require('./routes/authentication')
const profileRoute = require('./routes/profile')
const postRoute = require('./routes/posts')
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
app.use('/api/posts', checkUser, postRoute)

app.use('/api', authenticationRoute)

app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))
