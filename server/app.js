// API - Application Programming Interface - HTTP
// RESTful API
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/hello', (req, res, next) => {
    res.send('hello')
})

app.post('/api/signup', (req, res, next) => {
    // JSON
    const user = req.body
    // ... save to the db
    res.send(user)
})

app.listen(3000)