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

beforeEach(async () => {

    await Parent.deleteMany({})
    await Parent.insertMany(helper.initialParents)
    const parents = await Parent.find({})
    console.log("HALOOOOOOOO", parents)
    const testParent = parents[0]
    const loginc = {email: testParent.email, password: "salasana1", user_type: "parent_user"}
    console.log(testParent)
    console.log(loginc)

    const response = await api.post('/api/login').send(loginc)
   
    authorization = `bearer ${response.body.token}`

})

test('daycareworkers are returned as json', async () => {
    await api.get('/api/workers')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


describe('when there is initially one parent in the db', () => {

    beforeEach(async () => {
        await Parent.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const parent = new Parent({name: "Test Parent", email: "new.parent@email.com", phone: "12121212121", user_type: "parent_user", passwordHash})
        await parent.save()
    })

    test('creation succeeds with a unique email', async () => {
        const parentsAtStart = await helper.parentsIndDb()
        console.log(parentsAtStart)
        const newParent = {
            name: "Testt tes",
            email: "test@test.com",
            phone: "11111111122222",
            children: [],
            password: "salasana",
        }

        await api.post('/api/parents').send(newParent).expect(201).expect('Content-Type', /application\/json/)

        const parentsAtEnd = await Parent.find({})
        expect(parentsAtEnd).toHaveLength(parentsAtStart.length +1)

        const parentnames = parentsAtEnd.map(p => p.name)
        expect(parentnames).toContain(newParent.name)
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})

