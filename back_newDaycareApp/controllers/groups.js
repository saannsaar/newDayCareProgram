const groupRouter = require('express').Router()
const DaycareWorker = require('../models/DaycareWorker')
const Group = require('../models/Group')
const {userExtractor } = require('../utils/middleware')

// Get all the parents from the db
groupRouter.get('/', userExtractor, async (request, response) => {
    const group = await Group.find({}).populate({path: 'children', model: 'Child'}).populate({path: 'workers_in_charge', model: 'DaycareWorker'})
    console.log(group)
    response.json(group)
})

groupRouter.post('/', userExtractor, async (request, response) => {

    if (request.user.user_type == 'parent_user') {
      response.status(401).json({error: "You are not authorized to create a group"}).end()

    } else {
      
      const {name, workers_in_charge} = request.body
      const findWorker = await DaycareWorker.findOne({name: workers_in_charge})
    
      try {
        const addGroup = new Group({
          name,
          workers_in_charge: findWorker?._id,
      })
        const saved_group = await addGroup.save()
        response.status(201).json(saved_group)
      } catch (error) {
        response.status(400).json(error)
  
      }
    }
})

groupRouter.put('/:id', userExtractor, async (request, response) => {
  if (request.user.user_type == 'parent_user') {
    response.status(401).json({error: "You are not authorized to modify a group"}).end()
  } else {
    
    try { 
      const changeGroup = await Group.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
      }).exec()
      response.json(changeGroup)
    } catch (error) {
      response.status(400).json(error)

    }
  }
})

groupRouter.get('/:id', async (request, response) => {
    const spesific_group = await Group.findById(request.params.id)
    if (spesific_group) {
      response.json(spesific_group)
    } else {
      response.status(404).end()
    }
  })

  module.exports = groupRouter