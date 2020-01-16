const express = require('express')
const router = new express.Router()
 
const User = require('../models/user.js')


router.post('/users',async (req,res)=>{
    console.log(req.body)
    const newUser = new User(req.body)
    try{
        await newUser.save()
        res.status(201).send(newUser)
    }catch(e){
        res.status(400).send(e)
    }

    // newUser.save().then(()=>{
    //     res.status(201).send(newUser)
    // }).catch((error)=>{
    //     res.status(400).send(error)
       
    // })
   
})

router.get('/users',async(req,res)=>{
    console.log('in get')
    
    try{
      const users=  await User.find({})
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
    
    // User.find({}).then((users)=>{
    //     res.send(users)
    // }).catch((error)=>{
    //    res.status(500).send(error)
    // })
})

router.get('/users/:id',async(req,res)=>{
    const _id=req.params.id

    try{
       const users = await User.findById(_id)
       if(!users){
            return res.status(404).send("User not found")
        }
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }

    //  User.findById(_id).then((users)=>{
    //      if(!users){
    //         return res.status(404).send("User not found")
    //      }
    //      res.send(users)
    //  }).catch((error)=>{
    //     res.status(500).send(error)
    //  })
})


router.patch('/users/:id',async(req,res)=>{
    const _id=req.params.id

    try{
       const users = await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
       if(!users){
            return res.status(404).send("User not found")
        }
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
})


router.delete('/users/:id',async(req,res)=>{
    const _id=req.params.id

    try{
       const users = await User.findByIdAndDelete(_id)
       if(!users){
            return res.status(404).send("User not found")
        }
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }

})


module.exports = router

