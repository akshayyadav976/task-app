const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser: true,
    useCreateIndex :true
})


// const Tasks = mongoose.model('Tasks',{
//     description:{
//         type : String,
//         required: true,
//         trim: true
//     },
//     completed:{
//         type: Boolean,
//         default:false

//     }
// })

//  const newTask1 = new Tasks({
//      description :'  House clean  ',
     
//  })

//  newTask1.save().then(()=>{
//      console.log(newTask1)
//  }).catch((error)=>{
//      console.log('Error : ',error)
//  })