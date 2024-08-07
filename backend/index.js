const express = require('express')
const PORT = 5500
const app = express()

app.get('/', (req, res) => {
    res.send("Backend Route")
})

app.listen(PORT, () => console.log(`server started at http://127.0.0.1:${PORT}`))