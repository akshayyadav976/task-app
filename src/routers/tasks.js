const express = require('express')
const router = new express.Router()
const Tasks = require('../models/tasks.js')
const auth = require('../middleware/auth.js')

router.get('/tasks',auth,async(req,res)=>{
    console.log('in get')

    // const match={}
    // if(req.query.completed){
    //     match.completed = req.query.completed === 'true'
    // }

    try{
    const gettasks = await Tasks.find({owner:req.user._id})
    
    //await req.user.populate('tasks').execPopulate()
    res.send(gettasks)
    }catch(e){
        res.status(500).send(e)
    }
    // Tasks.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((error)=>{
    //    res.status(500).send(error)
    // })
})

router.get('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id

    try{
//const gettasks = await Tasks.findById(_id)

const tasks = await Tasks.findOne({_id,owner : req.user._id})
        if(!tasks){
            return res.status(404).send("Task not found")
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }

    //  Tasks.findById(_id).then((tasks)=>{
    //      if(!tasks){
    //         return res.status(404).send("Task not found")
    //      }
    //      res.send(tasks)
    //  }).catch((error)=>{
    //     res.status(500).send(error)
    //  })
})


router.post('/tasks',auth,async(req,res)=>{
    console.log(req.body)
   // const newTask = new Tasks(req.body)
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
         await task.save()
         res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
    
    // newTask.save().then(()=>{
    //     res.status(201).send(newTask)
    // }).catch((error)=>{
    //     res.status(400).send(error)
       
    // })
   
})


router.patch('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','completed']
    const isValidoperation = updates.every((update) => allowedUpdates.includes(update))
    
    console.log('isValidoperation : '+isValidoperation)
    
    if(!isValidoperation){
        return res.status(400).send({error:'Invalid update'})
    }
    

    try{
        const tasks =await Tasks.findOne({_id:req.params.id,owner:req.user._id})
       // const tasks =await Tasks.findByIdAndUpdate(_id)

        

       //const tasks =await Tasks.findOneAndUpdate(_id,req.body,{new:true,runValidators:true})
       console.log(tasks)
       if(!tasks){
            return res.status(404).send("tasks not found")
        }
        updates.forEach((update)=>{
            tasks[update]=req.body[update]
        })
    
        await tasks.save()
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id',auth,async(req,res)=>{
    const _id=req.params.id

    try{
        const task = await Tasks.findByIdAndDelete({_id,owner:req.user._id})
       //const task = await Tasks.findByIdAndDelete(_id)
       if(!task){
            return res.status(404).send("task not found")
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

})




module.exports = router