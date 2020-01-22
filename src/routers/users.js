const express = require('express')
const router = new express.Router()
const multer=require('multer')
const sharp = require('sharp')
const {sendWelcomeEmail,sendCancelationEmail} = require('../emails/account.js')
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')

router.post('/users', async (req,res)=>{
     
    const newUser = User (req.body)
    try{
        await newUser.save()
        sendWelcomeEmail(user.email,user.name)
        const tokens =  await newUser.generateAuthToken()
        res.status(201).send({newUser , tokens})
    }catch(e){
        res.status(400).send(e)
    }

    // newUser.save().then(()=>{
    //     res.status(201).send(newUser)
    // }).catch((error)=>{
    //     res.status(400).send(error)
       
    // })
   
})

 router.get('/users/me',auth , async(req,res)=>{
     res.send(req.user)
    
  })

 /*router.get('/users',auth, async(req,res)=>{
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
*/
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

/*
router.patch('/users/:id',async(req,res)=>{

    const updates = Object.keys(req.body)
const allowedUpdates = ['age','name','email','password']
const isValidoperation = updates.every((update) => allowedUpdates.includes(update))

console.log('isValidoperation : '+isValidoperation)

if(!isValidoperation){
    return res.status(400).send({error:'Invalid update'})
}

    const _id=req.params.id
    console.log("in patch")
    try{
    const users = await User.findByIdAndUpdate(_id)

    updates.forEach((update)=>{
        users[update]=req.body[update]
    })

    await users.save()

       //const users = await User.findByIdAndUpdate(_id,req.body, {new:true,runValidators:true})
       if(!users){
            return res.status(404).send("User not found")
        }
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }
})
*/
router.patch('/users/me',auth,async(req,res)=>{

    const updates = Object.keys(req.body)
const allowedUpdates = ['age','name','email','password']
const isValidoperation = updates.every((update) => allowedUpdates.includes(update))

console.log('isValidoperation : '+isValidoperation)

if(!isValidoperation){
    return res.status(400).send({error:'Invalid update'})
}
   
    try{
    updates.forEach((update)=>{
        req.user[update]=req.body[update]
    })

    await req.user.save()
    res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    const _id=req.params.id

    try{
      req.user.remove()
      sendCancelationEmail(req.user.email,req.user.name)
        res.send(users)
    }catch(e){
        res.status(500).send(e)
    }

})

/*
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

})*/

router.post('/users/login', async (req,res)=>{
    try{
        const user = 
    await User.findByCredentials(req.body.email,req.body.password)
       
    const token = await user.generateAuthToken()

    console.log(token)
    res.send({user,token})
    //res.send({user: user.getPublicProfile(),token})
    }catch(e){
        res.status(400).send()
    }
})


router.post('/users/logout', auth ,async (req,res)=>{
    try{
        
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})
router.post('/users/logoutAll', auth ,async (req,res)=>{
    try{
        
        req.user.tokens = []           
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
   
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(new Error('Please upload image file'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{

    const buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()

},(error,req,res,next)=>{
    res.status(400).send({ error :error.message})
})

 router.delete('/users/me/avatar',auth,async(req,res)=>{
     req.user.avatar = undefined
     await req.user.save()
    res.send()

},(error,req,res,next)=>{
    res.status(400).send({ error :error.message})
})

router.get('/users/:id/avatar',async(req,res)=>{
   
try{
const user = await User.findById(req.params.id)

if(!user.avatar || !user){
    throw new Error()

}
res.set('Content-Type','image/png')
res.send(user.avatar)

}catch(e){
    res.status(404).send()
}
    await req.user.save()
   res.send()

})



module.exports = router

