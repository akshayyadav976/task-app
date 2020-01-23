const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../../src/models/user.js')
const Task = require('../../src/models/tasks.js')

const userOneId = new mongoose.Types.ObjectId()
const userOne={
        _id : userOneId,
        name : 'Mike',
        email:'Mike@iconnectsolutions.com',
        password:'Aksh@11!',
        tokens:[{
            token: jwt.sign({_id : userOneId},process.env.JWT_SECRET)
        }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo={
    _id : userTwoId,
    name : 'Akshay',
    email:'Akshay@iconnectsolutions.com',
    password:'Aksh@11!',
    tokens:[{
        token: jwt.sign({_id : userTwoId},process.env.JWT_SECRET)
    }]
}

const setupDB =async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

const taskOne={
    _id: new mongoose.Types.ObjectId(),
    description:'first task',
    completed:false,
    owner:userOne._id
}


const taskTwo={
    _id: new mongoose.Types.ObjectId(),
    description:'second task',
    completed:false,
    owner:userOne._id
}


const taskThree={
    _id: new mongoose.Types.ObjectId(),
    description:'Third task',
    completed:false,
    owner:userTwo._id
}

module.exports={
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDB
}