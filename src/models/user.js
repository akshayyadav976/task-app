const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const Tasks = require('../models/tasks.js')



const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true,
        trim: true
    },
    email:{
        type : String,
        unique:true,
        required: true,
        trim: true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    age:{
        type: Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age should be positive number')
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength:7,
        trim:true
        
        // validate(value){
        //     if(value.includes('password')){
        //         throw new Error('password can not contain "password"')
        //     }
        // }
    },
    tokens:[{
        token :{
            type: String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }


},{
    timestamps : true
})

//  userSchema.pre('save', async function(next){
//     const  user =this
//     console.log('just before saving')


//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password,8)
//     }
//      next()
//  })


// userSchema.methods.getPublicProfile = function (){
//     const user = this
//     const userObject = user.toObject()
//     delete user.password
//     delete user.tokens
    
//     return userObject
// }



userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()
    delete user.password
    delete user.tokens
    delete user.avatar
    
    return userObject
}
userSchema.methods.generateAuthToken = async function(){

    console.log('IN generateAuthToken')
    const user =  this
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    
    await user.save()
     
    console.log(token)
    return token
}


userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email:email})
console.log('IN findByCredentials')
    if(!user){
        throw new Error('unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
    {
        throw new Error('unable to login')
    }
    console.log('in creden :' +user)
    return user
}

//hash the p[lain text password before saving]
userSchema.pre('save', async function(next){

    const user= this
    console.log('just before saving')

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})


// DELETE USER TASK WHEN USER REMOVE    
userSchema.pre('remove',async function(next){
    const user= this
    await Tasks.deleteMany({owner:user._id})
    next()
})

 const User = mongoose.model('User',userSchema)




module.exports = User