const groupRouter = require('express').Router()

const Group = require('../models/Group')

// Get all the parents from the db
groupRouter.get('/', async (request, response) => {
    const group = await Group.find({}).populate({path: 'children', model: 'Child', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
    console.log(group)
    response.json(group)
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