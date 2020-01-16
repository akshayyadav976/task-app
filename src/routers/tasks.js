const express = require('express')
const router = new express.Router()
const Tasks = require('../models/tasks.js')


router.get('/tasks',async(req,res)=>{
    console.log('in get')
    try{
    const gettasks = await Tasks.find({})
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

router.get('/tasks/:id',async(req,res)=>{
    const _id=req.params.id

    try{
        const gettasks = await Tasks.findById(_id)
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


router.post('/tasks',async(req,res)=>{
    console.log(req.body)
    const newTask = new Tasks(req.body)
    
    try{
         await newTask.save()
         res.status(201).send(newTask)
    }catch(e){
        res.status(400).send(e)
    }
    
    // newTask.save().then(()=>{
    //     res.status(201).send(newTask)
    // }).catch((error)=>{
    //     res.status(400).send(error)
       
    // })
   
})


router.patch('/tasks/:id',async(req,res)=>{
    const _id=req.params.id

    try{
       const tasks =await Tasks.findOneAndUpdate(_id,req.body,{new:true,runValidators:true})
       console.log(tasks)
       if(!tasks){
            return res.status(404).send("tasks not found")
        }
        res.send(tasks)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/tasks/:id',async(req,res)=>{
    const _id=req.params.id

    try{
       const task = await Tasks.findByIdAndDelete(_id)
       if(!task){
            return res.status(404).send("task not found")
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

})



module.exports = router