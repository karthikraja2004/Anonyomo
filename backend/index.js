const express = require('express')
const app = express()

require('dotenv').config()

const PORT = 5500

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connection successful")
    })
    .catch((err) => console.log("database connection failed"))


app.get('/', (req, res) => {
    res.send("Backend Route")
})

app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))