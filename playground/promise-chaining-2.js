require('../src/db/mongoose.js')
const Task = require('../src/models/tasks.js')


Task.findByIdAndRemove('5e1f020bc7340a36915670b2').then((task)=>{
console.log(task)
return Task.countDocuments({completed : false})
}).then((result)=>{
console.log('Task count '+result)
}).catch((e)=>{
    console.log(e)
})
