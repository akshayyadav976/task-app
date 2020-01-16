const mongoose = require('mongoose')
const validator = require('validator')


 const User = mongoose.model('User',{
     name:{
         type : String,
         required:true,
         trim: true
     },
     email:{
         type : String,
         required: true,
         trim: true,
         lowercase:true,
         validate(value){
             if(!validator.isEmail(value)){
                 throw new Error('Email is invalid')
             }
         }
     },
     Age:{
         type: Number,
         default:0,
         validate(value){
             if(value < 0){
                 throw new Error('Age should be positive number')
             }
         }
     }
 })




module.exports = User