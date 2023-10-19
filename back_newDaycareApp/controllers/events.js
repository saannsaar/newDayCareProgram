const eventsRouter = require('express').Router()

const Event = require('../models/Event')
const Group = require('../models/Group')
const { userExtractor } = require('../utils/middleware')

// Get all the events from the db
eventsRouter.get('/', async (request, response) => {
    const events = await Event.find({})
    console.log(events)
    response.json(events)
})

eventsRouter.delete('/:id', userExtractor, async (request, response) => {
   
    const user = request.user
    if( !user || user.user_type == "parent_user") {
      return response(401).json({error: "You are not aaouthorized to delete an event"})
    }

    const event = await Event.deleteOne({_id: request.params.id })
    console.log(event)
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
        console.log(body)
        const user = request.user 
        const group = await Group.findOne({name: body.group})
        console.log(group)
        console.log(user)

        if(!user) {
            return response.status(401).json({error: "You cant do that"})
        }

        if (request.user.user_type == 'parent_user') {
          console.log("HALOO:S:S:S:S:S:S:S:S:S:S:S:S:")
          response.status(401).json({error: "You are not authorized create a new parentaccount"}).end()
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
  
          if (group) {
              group.events = group.events.concat(saved_event._id)
              await group.save()
          }
  
          console.log(group)
  
          response.status(201).json(saved_event)
          }
          catch (error) {
            console.log(error)
            response.status(401).json(error)
          }
          }


      

  })

  module.exports = eventsRouter