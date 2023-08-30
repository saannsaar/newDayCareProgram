const parentRouter = require('express').Router()

const Parent = require('../models/Parent')

// Get all the parents from the db
parentRouter.get('/', async (request, response) => {
    const parents = await Parent.find({}).populate({path: 'children', model: 'Child', populate :{path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}}})
    console.log(parents)
    response.json(parents)
})

parentRouter.get('/:id', async (request, response) => {
    const sepesific_parent = await Child.findById(request.params.id)
    if (sepesific_parent) {
      response.json(sepesific_parent)
    } else {
      response.status(404).end()
    }
  })

  module.exports = parentRouter