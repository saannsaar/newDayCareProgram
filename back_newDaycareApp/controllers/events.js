const eventsRouter = require('express').Router()
const logger = require('../utils/logger')
const Event = require('../models/Event')
const Group = require('../models/Group')
const { userExtractor } = require('../utils/middleware')

// Get all the events from the db
eventsRouter.get('/', userExtractor, async (request, response) => {
    try {
      const events = await Event.find({})
      response.json(events)
    } catch (error) {
      logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
    }
})

eventsRouter.delete('/:id', userExtractor, async (request, response) => {
   
    const user = request.user
    if( !user || user.user_type == "parent_user") {
      logger.error(`DELETEERROR, USER ${user.name}, ERRORMESSAGE: Not authorized to delete an event`)
      return response(401).json({error: "You are not authorized to delete an event"})
    
    }
    const event = await Event.deleteOne({_id: request.params.id })
    response.status(204).end()

})

eventsRouter.get('/:id', async (request, response) => {
    const spesific_event = await Event.findById(request.params.id)
    if (spesific_event) {
      response.json(spesific_event)
    } else {
      response.status(404).end()
    }
  })

  eventsRouter.post('/', userExtractor, async (request, response) => {
        const body = request.body
        const user = request.user 
        const group = await Group.findOne({name: body.group})

        if(!user) {
            return response.status(401).json({error: "You cant do that"})
        }

        if (request.user.user_type == 'parent_user') {
          response.status(401).json({error: "You are not authorized create a new event"}).end()
        } else {

          try {
            const new_event = new Event({
              name: body.name,
              date: body.date,
              event_type: body.event_type,
              info: body.info,
              group: group ? group.id : null 
          })
      
          const saved_event = await new_event.save()
  
          response.status(201).json(saved_event)
          }
          catch (error) {
            logger.error(`POSTERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
            response.status(401).json(error)
          }
          }

  })

  module.exports = eventsRouter