const express = require('express')
require('./db/mongoose.js')
const User = require('./models/user.js')
const Tasks = require('./models/tasks.js')
const jwt = require('jsonwebtoken')
const userRouter = require('./routers/users.js')
const tasksRouter = require('./routers/tasks.js')
const bcrypt = require('bcryptjs')  
const app = express()

const port = process.env.PORT || 3000
const multer=require('multer')
const upload = multer({
    dest:'images'
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})





// app.use((req,res,next)=>{

//     console.log(req.method,req.path)
//     next()
// })

// app.use((req,res,next)=>{
   
//         res.status(503).send('Server is under maintainance')
//  })

app.use(express.json())
app.use(userRouter)
app.use(tasksRouter)



app.listen(port,()=>{
    console.log('server is up on port ',+port)
})

//const Task = require('./models/tasks.js')
//const User = require('./models/user.js')







// const jwt = require('jsonwebtoken')

// const myFunction = async()=>{

//     const token = jwt.sign({_id:'123123'},'thisismynewcourse')

//     console.log("token : "+token)

//     const data = jwt.verify(token,'thisismynewcourse')

//     console.log("verifeid :"+data)
// }

// myFunction()

// const mypassword = async()=>{
//     const password = 'Aks123@'
//     const hashpassword = await bcrypt.hash(password,8)
//     console.log('password : '+password)
//     console.log('hashpassword : '+hashpassword)

//     const isMatch = await bcrypt.compare(password,hashpassword)
//     console.log(isMatch)
// }

// mypassword() 