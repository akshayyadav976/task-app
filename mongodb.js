const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

const mongodbURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(mongodbURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect database')
    }

    const db = client.db(databaseName)

     db.collection('tasks').deleteOne({
         _id:new ObjectID('5e1d9bcd00dd0d7e1f136062')
     }).then((result)=>{
         console.log(result)
     }).catch((error)=>{
         console.log(error)
     })

    // db.collection('users').deleteMany({
    //      Age: 7
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // },{
    //     $set:{
    //         completed: true
    //     }

    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5e1d9f98bd4a737fff93187d')
    // },{
    //     // $set:{
    //     //     name : 'M5',
    //     //     Age :5
    //     // } 
        
    //     $inc:{
    //         Age:2
    //     }

    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    // db.collection('users').findOne({name:'vicky'},(error,result)=>{

    //     if(error)
    //     return console.log('unable to fetch')
    //     console.log(result)
    // })




    // db.collection('users').insertOne({
    //     _id:id,
    //     name:'vicky',
    //     Age:28
    // },(error,result)=>{
    //     if(error){
    //         return console.log('Unable to insert document')
    //     }
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //     name: 'Aksh',
    //     Age: 28
    //     }, 
    //     {
    //     name: 'Ak',
    //     Age: 28
    //     }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert document')
    //     }
    //     console.log(result.ops)
    // })


    // db.collection('tasks').insertMany([
    //     {
    //     description: 'clean home',
    //     completed: true
    //     }, 
    //     {
    //         description: 'clean garden',
    //         completed: true
    //     },
    //     {
    //         description: 'clean car',
    //         completed: false
    //     }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert document')
    //     }
    //     console.log(result.ops)
    // })



})
