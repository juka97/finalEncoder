const express = require('express')
const app = express()
const port = 8080
const login = require('./login')
const authorization = require('./middleware/authorization')
const encoder = require('./middleware/algorithm')
module.exports = app

app.use(express.json())

app.post('/login', login)

app.post('/encode', authorization, encoder)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))