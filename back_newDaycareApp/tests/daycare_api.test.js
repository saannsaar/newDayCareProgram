const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('daycareworkers are returned as json', async () => {
    await api.get('/api/workers')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(async () => {
    await mongoose.connection.close()
})

