const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Tasks = require('./models/tasks.js')
const jwt = require('jsonwebtoken')
const userRouter = require('./routers/users.js')
const tasksRouter = require('./routers/tasks.js')
const bcrypt = require('bcryptjs')  
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)

module.exports = app