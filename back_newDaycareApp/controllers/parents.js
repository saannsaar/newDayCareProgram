const parentRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Parent = require('../models/Parent')
const {userExtractor } = require('../utils/middleware')

// Get all the parents from the db
parentRouter.get('/',userExtractor, async (request, response) => {
  if (request.user.user_type == 'parent_user') {
    response.status(401).json({error: "You are not authorized to view this page"})
  }
  
    const parents = await Parent.find({}).populate({path: 'children', model: 'Child'})
    response.json(parents)
})

parentRouter.get('/:id', userExtractor, async (request, response) => {

  const findParent = await Parent.findById(request.params.id)
  if (request.user.user_type == 'parent_user' && findParent.id != request.user.id) {
    response.status(401).json({error: "You are not authorized to view this page"})
  }
    const sepesific_parent = await Parent.findById(request.params.id).populate({path: 'children', model: 'Child'})
    if (sepesific_parent) {
      response.json(sepesific_parent)
    } else {
      response.status(404).end()
    }
  })

  parentRouter.put('/:id', userExtractor, async (request, response) => {

    if (request.user.user_type == 'parent_user' && request.body.name !== request.user.name) {
      response.status(401).json({error: "You are not authorized to modify this account"})
    }
      try {
        const parent = await Parent.findByIdAndUpdate(request.params.id, request.body, {
          new: true,
        }).exec()
        response.json(parent)
      } catch(error) {
        next(error)
      }
    })

  parentRouter.post('/', userExtractor, async (request, response) => {

    console.log(request.user)
    if (request.user.user_type == 'parent_user') {
      response.status(401).json({error: "You are not authorized create a new parentaccount"}).end()
    } else {
      const {email, name, phone, user_type, password} = request.body

      const saltRounds = 10 
      const passwordHash = await bcrypt.hash(password, saltRounds)
  
      const user = new Parent({
          email,
          name,
          phone,
          user_type,
          passwordHash,
      })
  
      try {
        const saved_parent = await user.save()
        response.status(201).json(saved_parent)
      } catch (error) {
        response.status(400).json(error)
  
      }
    }
})

  module.exports = parentRouter