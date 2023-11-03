const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)
let authorization = ""

const Child = require('../models/Child')
const Worker = require('../models/DaycareWorker')
const Event = require('../models/Event')
const Parent = require('../models/Parent')
const Group = require('../models/Group')
const helper = require('./test_helper')
const DayCare = require('../models/Daycare')

describe('Parent account logged in', () => {

    beforeEach(async () => {

        await Parent.deleteMany({})
        await Child.deleteMany({})
        await Child.insertMany(helper.initialChildren)
        
        const passwordHash = await bcrypt.hash("salasana1", 10)
        const newParent = new Parent({
            name: "Caroline Forbes-Kirk",
            email: "caroline.forbeskirk@emailaddress.com",
            phone: "11111111122222",
            children: ["6526595cd5caab3108c41444"],
            passwordHash: passwordHash,
            user_type: "parent_user"
        })
        await Parent.insertMany(newParent)
       
        const parents = await Parent.find({})
       // console.log(parents)
        const testParent = parents[0]
        //console.log(testParent)
        const loginc = {email: testParent.email, password: "salasana1", user_type: "parent_user"}
    
        // const d = await api.get('/api/workers')
        
        const response = await api.post('/api/login').send(loginc)
       
        //console.log(response.error)
        authorization = `bearer ${response.body.token}`
        //console.log(authorization)
    
    })

    test('new account creation shouldnt success since parent account cant add another parent account', async () => {
        const parentsAtStart = await Parent.find({})
        //console.log(parentsAtStart)
        const newParent = {
            name: "Testt tes",
            email: "test@test.com" ,
            phone: "1111111809022",
            password: "salasana",
            user_type: "parent_user"
        }
        // console.log(newParent)

        const response = await api.post('/api/parents').set("Authorization", authorization).send(newParent).expect(401).expect('Content-Type', /application\/json/)
        expect(response.body.error).toContain("not authorized")
        const parentsAtEnd = await Parent.find({})
        expect(parentsAtEnd).toHaveLength(parentsAtStart.length)

       
    })
    test('logged in user can change their own email or phone number', async () => {
        const parentsAtStart = await Parent.findOne({name: "Caroline Forbes-Kirk"})
        // console.log(JSON.stringify(parentsAtStart))
        const js = JSON.stringify(parentsAtStart)
        const jsonParent = JSON.parse(js)
        const modifiedInfo = {...jsonParent, email: "changedEmail@email.email"}
        // console.log(modifiedInfo)
        await api.put(`/api/parents/${modifiedInfo.id}`).set("Authorization", authorization).send(modifiedInfo).expect(200)
        const parentsAfter = await Parent.find({})

        expect(parentsAfter[0].email).toContain(modifiedInfo.email)
    })

    test('logged in user can get their own childrens info', async () => {
        const parentsAtStart = await Parent.findOne({name: "Caroline Forbes-Kirk"})
        // console.log(parentsAtStart.children[0].toString())
        const id = parentsAtStart.children[0].toString()
        const response = await api.get(`/api/children/${id}`).set("Authorization", authorization).expect(200).expect('Content-Type', /application\/json/)
        // console.log(response.body) 
        expect(response.body.name).toContain('Weston Kirk')
    })

    test('logged in user cant get other childrens info', async () => {
        const children = await Child.find({})
        // console.log(children[1])
        const id = children[1].id
        // console.log(id)
        const response = await api.get(`/api/children/${id}`).set("Authorization", authorization).expect(401).expect('Content-Type', /application\/json/)
        // console.log(response.body.error) 
        expect(response.body.error).toContain('Not authorized')
       
    })

    test('logged in parentuser can add caretimes for own child', async () => {
       
        const newCaretime = {
            start_time: "2023-09-22T07:15:00.00+03:00",
            end_time: "2023-09-22T15:00:00.00+03:00",
        }
        const parentsAtStart = await Parent.findOne({name: "Caroline Forbes-Kirk"})
        const id = parentsAtStart.children[0].toString()

        const response = await api.post(`/api/children/${id}/caretimes`).set("Authorization", authorization).send(newCaretime).expect(201).expect('Content-Type', /application\/json/)
        console.log(response.body)
        expect(response.body.kid_name).toContain('Weston Kirk')

    })

    test('logged in parentuser can send a message to worker and find conversation', async () => {
        await Worker.deleteMany({})
        await Worker.insertMany(helper.initializeWorkers)
        const workers = await Worker.find({})
        console.log(workers)
        const parentsAtStart = await Parent.findOne({name: "Caroline Forbes-Kirk"})
        const id = parentsAtStart.children[0].toString()


        const newMessage = {
            content: "Test message content",
            receiver: "Claire Dundret",
        }

        const response = await api.post(`/api/messages`).set("Authorization", authorization).send(newMessage).expect(201).expect('Content-Type', /application\/json/)
        console.log(response.body)
        expect(response.body.content).toContain('Test message content')

        
        const response2 = await api.get(`/api/messages/${workers[0].id}`).set("Authorization", authorization).expect(200).expect('Content-Type', /application\/json/)
        console.log(response2.body)
        expect(response2.body[0].content).toContain('Test message content')
    })
})

describe('Worker logged', () => {

    beforeEach(async () => {
    await Parent.deleteMany({})
    await Child.deleteMany({})
    await Worker.deleteMany({})
    await Child.insertMany(helper.initialChildren)

    
    
    const passwordHash = await bcrypt.hash("salasana", 10)
    const newWorker = new Worker({
        name: "Maddie Mikkelson",
        born: "19.11.1989",
        email: "maaddie.mikk@emailaddress.com",
        phone: "00009999900909",
        passwordHash: passwordHash,
        user_type: "worker_user"
    })
    await Worker.insertMany(newWorker)
   
    const workers = await Worker.find({})
    console.log(workers)
    const testWorker = workers[0]
    console.log(testWorker)
    const loginc = {email: testWorker.email, password: "salasana", user_type: "worker_user"}

    
    const response = await api.post('/api/login').send(loginc)
   
    //console.log(response.error)
    authorization = `bearer ${response.body.token}`
    console.log(authorization)
 })

 test('logged in workeruser cant all childrens info', async () => {

    const response = await api.get(`/api/children`).set("Authorization", authorization).expect(200).expect('Content-Type', /application\/json/)
    console.log(response.body) 
    expect(JSON.stringify(response.body)).toContain("Weston Kirk")   
})
 

 test('logged in workeruser cant get spesific childrens info', async () => {
    const children = await Child.find({})
    // console.log(children[1])
    const id = children[1].id
    // console.log(id)
    const response = await api.get(`/api/children/${id}`).set("Authorization", authorization).expect(200).expect('Content-Type', /application\/json/)
    console.log(response.body) 
    expect(JSON.stringify(response.body)).toContain("Mary Lee")
})


test('logged in workeruser can add a new childs info and the child is also added to parents children', async () => {
    const childrenatStart = await Child.find({})
    const passwordHash = await bcrypt.hash("salasana1", 10)
    const newParent = new Parent({
        name: "Caroline Forbes-Kirk",
        email: "caroline.forbeskirk@emailaddress.com",
        phone: "11111111122222",
        children: ["6526595cd5caab3108c41444"],
        passwordHash: passwordHash,
        user_type: "parent_user"
    })
    await Parent.insertMany(newParent)
   
    const parents = await Parent.find({})
    console.log(parents)
    const newChild = {
        name: "New Child",
        born: "01.01.2022",
        parents: ["Caroline Forbes-Kirk"],
        monthly_maxtime: "150h",
    }
    const response = await api.post('/api/children').set("Authorization", authorization).send(newChild).expect(201).expect('Content-Type', /application\/json/)
    expect(JSON.stringify(response.body)).toContain("New Child")
    const childrenAtEnd = await Child.find({})
    expect(childrenAtEnd).toHaveLength(childrenatStart.length +1)

})

test('logged in workeruser cant add a new child if name isnt unique', async () => {
    const childrenatStart = await Child.find({})
    const passwordHash = await bcrypt.hash("salasana1", 10)
    const newParent = new Parent({
        name: "Caroline Forbes-Kirk",
        email: "caroline.forbeskirk@emailaddress.com",
        phone: "11111111122222",
        children: ["6526595cd5caab3108c41444"],
        passwordHash: passwordHash,
        user_type: "parent_user"
    })
    await Parent.insertMany(newParent)
   
    const parents = await Parent.find({})
    console.log(parents)
    const newChild = {
        name: "New Child",
        born: "01.01.2022",
        parents: ["Caroline Forbes-Kirk"],
        monthly_maxtime: "150h",
    }
    const response = await api.post('/api/children').set("Authorization", authorization).send(newChild).expect(201).expect('Content-Type', /application\/json/)
    expect(JSON.stringify(response.body)).toContain("New Child")


    const newChild2 = {
        name: "New Child",
        born: "12.11.2023",
        parents: ["Caroline Forbes-Kirk"],
        monthly_maxtime: "150h",
    }


    const response2 = await api.post('/api/children').set("Authorization", authorization).send(newChild).expect(400).expect('Content-Type', /application\/json/)
    console.log(response2.error)
    expect(response2.error.toString()).toContain("cannot POST /api/children (400)")

})

test('logged in user can get all the parents info', async () => {
    await Parent.deleteMany({})
    await Parent.insertMany(helper.initialParents)

    const response = await api.get('/api/parents').set("Authorization", authorization).expect(200).expect('Content-Type', /application\/json/)
    console.log(response.body)
})

test('logged in user can create a new group and add children in it', async () => {
    await Parent.deleteMany({})
    await Child.deleteMany({})
    await Group.deleteMany({})
    await Child.insertMany(helper.initialChildren)
    await Parent.insertMany(helper.initialParents)
   
   
    const newGroup = {
        name: "Uusi ryhmä",
        workers_in_charge: "Maddie Mikkelson",
    }

    const response = await api.post('/api/groups').set("Authorization", authorization).send(newGroup).expect(201).expect('Content-Type', /application\/json/)
    expect(JSON.stringify(response.body)).toContain("Uusi ryhmä")
    const groupsAtEnd = await Group.find({})
    expect(groupsAtEnd).toHaveLength(1)
})
test('logged in user cant create a new group with name that is taken', async () => {
    await Parent.deleteMany({})
    await Child.deleteMany({})
    await Group.deleteMany({})
    await Child.insertMany(helper.initialChildren)
    await Parent.insertMany(helper.initialParents)
   
   
    const newGroup = {
        name: "Uusi ryhmä",
        workers_in_charge: "Maddie Mikkelson",
    }

    const response = await api.post('/api/groups').set("Authorization", authorization).send(newGroup).expect(201).expect('Content-Type', /application\/json/)
    expect(JSON.stringify(response.body)).toContain("Uusi ryhmä")
    const groupsAtEnd = await Group.find({})
    expect(groupsAtEnd).toHaveLength(1)
    const newGroup2 = {
        name: "Uusi ryhmä",
        workers_in_charge: "Maddie Mikkelson",
    }

    const response2 = await api.post('/api/groups').set("Authorization", authorization).send(newGroup2).expect(400).expect('Content-Type', /application\/json/)
    expect(JSON.stringify(response2.error.toString())).toContain("cannot POST /api/groups (400)")
    const groupsAtEnd2 = await Group.find({})
    expect(groupsAtEnd2).toHaveLength(1)


})

test('logged in user can create events', async () => {
    await Parent.deleteMany({})
    await Child.deleteMany({})
    await Group.deleteMany({})
    await Event.deleteMany({})

    await Group.insertMany(helper.initialGroups)

    const groupsAtStart = await Group.find({})
    console.log(groupsAtStart)

    const newEvent = {
        name: "Metsäretki",
        date: "2023-02-10T10:00:00.000Z",
        event_type: "C_event",
        info: "Metsäretki pienten kanssa",
        group: "Pikkusten ryhmä"
    }

    
    const response = await api.post('/api/events').set("Authorization", authorization).send(newEvent).expect(201).expect('Content-Type', /application\/json/)
    expect(JSON.stringify(response.body)).toContain("Metsäretki")
})

test('logged in user can delete event', async () => {
    await Event.deleteMany({})
    await Group.deleteMany({})
    await Event.insertMany(helper.initialEvents)
    
    const events = await Event.find({})
    const event_id = events[0]._id.toString()
    const deleteresponse = await api.delete(`/api/events/${event_id}`).set("Authorization", authorization).expect(204)

})

})






afterAll(async () => {
    await mongoose.connection.close()
})

