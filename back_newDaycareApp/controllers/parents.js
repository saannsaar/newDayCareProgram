const parentRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Parent = require('../models/Parent')
const {userExtractor } = require('../utils/middleware')

// Get all the parents from the db
parentRouter.get('/', async (request, response) => {
    const parents = await Parent.find({}).populate({path: 'children', model: 'Child', populate :{path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}}})
    console.log(parents)
    response.json(parents)
})

parentRouter.get('/:id', async (request, response) => {
    const sepesific_parent = await Parent.findById(request.params.id)
    console.log(sepesific_parent.user_type)
    if (sepesific_parent) {
      response.json(sepesific_parent)
    } else {
      response.status(404).end()
    }
  })

  parentRouter.post('/', userExtractor,  async (request, response) => {
    const {email, name, phone, password} = request.body

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new Parent({
        email,
        name,
        phone,
        passwordHash,
    })

    const saved_parent = await user.save()

    response.status(201).json(saved_parent)
})

  module.exports = parentRouter