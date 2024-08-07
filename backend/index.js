const express = require('express')
const app = express()
const PORT = 5500

const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection successful")
    })
    .catch((err) => console.log("database connection failed"))


app.get('/', (req, res) => {
    res.send("Backend Route")
})

app.get('/api/v1/profile', (req, res) => {
    res.send("Profile page of User")
})

const authenticationRoute = require('./routes/authentication')
app.use('/api/v1/auth', authenticationRoute)

app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))