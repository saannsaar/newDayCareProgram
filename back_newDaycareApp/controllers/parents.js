const parentRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Parent = require('../models/Parent')
const {userExtractor } = require('../utils/middleware')
const logger = require('../utils/logger')
// Get all the parents from the db
parentRouter.get('/',userExtractor, async (request, response) => {
  if (request.user.user_type == 'parent_user') {
    response.status(401).json({error: "You are not authorized to view this page"})
  }
  try {
    const parents = await Parent.find({}).populate({path: 'children', model: 'Child'})
    response.json(parents)
  } catch (error) {
    logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
  }
})

parentRouter.get('/:id', userExtractor, async (request, response) => {

  const findParent = await Parent.findById(request.params.id)
  if (request.user.user_type == 'parent_user' && findParent.id != request.user.id) {
    response.status(401).json({error: "You are not authorized to view this page"})
    logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: Not authorized to view this parents information ${request.params.id}`)
  }   
    try {
      const sepesific_parent = await Parent.findById(request.params.id).populate({path: 'children', model: 'Child'})
      if (sepesific_parent) {
        response.json(sepesific_parent)
      }
    } catch (error) {
      logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
      response.status(404).end()
    }
  })

  parentRouter.put('/:id', userExtractor, async (request, response) => {

    if (request.user.user_type == 'parent_user' && request.body.name !== request.user.name) {
      response.status(401).json({error: "You are not authorized to modify this account"})
      logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: Not authorized to modify this parents information ${request.body.name}`)
    }
      try {
        const parent = await Parent.findByIdAndUpdate(request.params.id, request.body, {
          new: true,
        }).exec()
        response.json(parent)
      } catch(error) {
        logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
        next(error)
      }
    })

  parentRouter.post('/', userExtractor, async (request, response) => {

    console.log(request.user)
    if (request.user.user_type == 'parent_user') {
      response.status(401).json({error: "You are not authorized create a new parentaccount"}).end()
      logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: Not authorized to post new parent`)
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
        logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
      }
    }
})

  module.exports = parentRouter