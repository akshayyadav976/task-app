
const request = require('supertest')
const app = require('../src/app.js')
const User= require('../src/models/user.js')
const {userOne,userOneId,setupDB} = require('./fixtures/db.js')
beforeEach(setupDB)


test('Signup new user', async()=>{
    const response = await request(app).post('/users').send({
        "name" : "Akshay",
        "email":"akshayy@iconnectsolutions.com",
	    "password":"Aksh@11!"
    }).expect(201)

    // assert that database changed correctly
    const user = await User.findById(response.body._id)
    expect(user).not.toBeNull()

    // Assert about response
    expect(response.body.name).toBe('Akshay')
    expect (response.body).toMatchObject({
        user:{
            name : "Akshay",
            email :"akshayy@iconnectsolutions.com"
        },
        token:user.tokens[0].token
    })
    expect(user.password).not.toBe('Aksh@11!')

})


test('login user', async()=>{
    const response = await request(app).post('/users/login').send({
        
        "email":userOne.email,
	    "password":userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})



test('login non exist user', async()=>{
    await request(app).post('/users/login').send({
        
        "email":userOne.email,
	    "password":"aksh"
    }).expect(400)
})


test('fetch profile for user', async()=>{
    await request(app)
    .get('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})


test('should not get  profile for unauthorized user', async()=>{
    await request(app)
    .get('/users/me')
    //.set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401)
})


test('Delete  user account', async()=>{
    await request(app)
    .delete('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})


test('should not delete account for UNauthorized user', async()=>{
    await request(app)
    .delete('/users/me')
    // .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(401)
})



test('should upload image ', async()=>{
    await request(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','tests/fixtures/3.jpeg')
    .expect(200)

    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('should update valid user ', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:'Jess'
    })
   .expect(200)

    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Jess')
})


test('should not update Invalid user fields ', async()=>{
    await request(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        location:'Mumbai'
    })
   .expect(400)
   
})