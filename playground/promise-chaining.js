require('../src/db/mongoose.js')
const User = require('../src/models/user.js')
const Task = require('../src/models/tasks.js')


// User.findByIdAndUpdate('5e1ed5c6f9c394172a03ffd5',{Age:1}).then((user)=>{
// console.log(user)
// return User.countDocuments({Age:1})
// }).then((result)=>{
// console.log('count '+result)
// }).catch((e)=>{
//     console.log(e)
// })


// const findAndUpdateuser = async (id,age)=>{
//     const user = await User.findByIdAndUpdate(id,{Age:age})
//     const count = await User.countDocuments({Age:age})
   
//     return count
// }

//  findAndUpdateuser('5e1ed5c6f9c394172a03ffd5',2).then((count)=>{
//      console.log(count)
//  }).catch((e)=>{
//      console.log(e)
//  })


const deleteTaskAndCount = async (id)=>{
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed:false})
   
    return count
}

deleteTaskAndCount('5e1f0268c8dc1f372471e4b4').then((count)=>{
     console.log(count)
 }).catch((e)=>{
     console.log(e)
 })