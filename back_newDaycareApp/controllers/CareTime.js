const careTimeRouter = require('express').Router()
const mongoose = require('mongoose')

const CareTime = require('../models/CareTime')
const {userExtractor } = require('../utils/middleware')
const Child = require('../models/Child')


// Get all the caretimes from the db
careTimeRouter.get('/', async (request, response) => {
   const caretimes = await CareTime.find({}).populate('Child')
   console.log(caretimes)
   response.json(caretimes)
})


// Add new caretime's information to the db
careTimeRouter.post('/', userExtractor,  async (request, response) => {
    const body = request.body
    const user = request.user
    console.log(user)

    if (!user) {
      return response.status(401).json({error: "You cant do that"})
    }
    console.log(body.child_id)
    const findChild = await Child.findById(body.child_id)
    console.log(findChild)
    if (findChild) {
         // New caretime-object
    const new_caretime = new CareTime({
        start_time: body.start_time,
        end_time: body.end_time,
        kid: findChild._id,
    })
    console.log(new_caretime)
    
// Save 
   const saved_caretime = await new_caretime.save()
   findChild.care_time = findChild.care_time.concat(saved_caretime._id)
   await findChild.save()
   response.status(201).json(saved_caretime)

    } else {
        response.status(404).end()
    }
   
})

module.exports = careTimeRouter