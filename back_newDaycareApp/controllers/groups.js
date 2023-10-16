const groupRouter = require('express').Router()

const DaycareWorker = require('../models/DaycareWorker')
const Group = require('../models/Group')
const {userExtractor } = require('../utils/middleware')

// Get all the parents from the db
groupRouter.get('/', async (request, response) => {
    const group = await Group.find({}).populate({path: 'children', model: 'Child'}).populate({path: 'workers_in_charge', model: 'DaycareWorker'})
    console.log(group)
    response.json(group)
})

groupRouter.post('/', userExtractor, async (request, response) => {
  console.log(request.user)
    if (request.user.user_type == 'parent_user') {
      console.log("HALOO:S:S:S:S:S:S:S:S:S:S:S:S:")
      response.status(401).json({error: "You are not authorized to create a group"}).end()
    } else {
      const {name, workers_in_charge} = request.body
      const findWorker = await DaycareWorker.findOne({name: request.body.workers_in_charge})

      console.log(findWorker)
    
      try {
        const addGroup = new Group({
          name,
          workers_in_charge: findWorker?._id,
      })
        const saved_group = await addGroup.save()
        console.log(saved_group)
        response.status(201).json(saved_group)
      } catch (error) {
        console.log(error)
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