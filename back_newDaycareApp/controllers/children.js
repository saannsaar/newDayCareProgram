const childRouter = require('express').Router()
const mongoose = require('mongoose')

const Child = require('../models/Child')
const {userExtractor } = require('../utils/middleware')


// Get all the children from the db
childRouter.get('/', async (request, response) => {
   const children = await Child.find({}).populate('parents').populate({path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
   console.log(children)
   response.json(children)
})


// Add new child's information to the db
childRouter.post('/', userExtractor,  async (request, response) => {
    const body = request.body
    console.log(body)
    const user = request.user
    console.log(user)
    if (!user) {
      return response.status(401).json({error: "You cant do that"})
    }

   
    
    // New child-object
    const new_child = new Child({
        name: body.name,
        born: body.born,
        parents: body.parents,
        group: group ? group._id : null,
    })
    
    
// Save 
   const saved_child = await new_child.save()
   
   // Add new child's id to the given group
   if (group) {
    group.children = group.children.concat(saved_child._id)
    await group.save()
   }
  
   console.log(group)
   
   response.status(201).json(saved_child)
})

// Get one spesific child's information from the db with id
childRouter.get('/:id', async (request, response) => {
    const spesific_child = await Child.findById(request.params.id)
    if (spesific_child) {
      response.json(spesific_child)
    } else {
      response.status(404).end()
    }
  })



module.exports = childRouter