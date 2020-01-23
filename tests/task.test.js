const request = require('supertest')
const app = require('../src/app.js')
const Task = require('../src/models/tasks.js')
const {
    userOne,
    userOneId,
    userTwo,
    userTwoId,
    taskOne,
    taskTwo,
    taskThree,
    setupDB } = require('./fixtures/db.js')

beforeEach(setupDB)

test('Create task for user',async()=>{
     
    const response = await request(app)
    .post('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        description : ' house clean'
    })
    .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})


test('should fetch user task',async()=>{
     
    const response = await request(app)
    .get('/tasks')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
    
    expect(response.body.length).toBe(2)
})


test('should not delete other user task',async()=>{
     
    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization',`Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
    const task = await Task.findById(taskOne._id)

    expect(task).not.toBeNull()
})
