const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Tasks = require('./models/tasks.js')
const userRouter = require('./routers/users.js')
const tasksRouter = require('./routers/tasks.js')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)



app.listen(port,()=>{
    console.log('server is up on port ',+port)
})