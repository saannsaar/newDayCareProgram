const eventsRouter = require('express').Router()

const Event = require('../models/Event')
const Group = require('../models/Group')
const { userExtractor } = require('../utils/middleware')

// Get all the events from the db
eventsRouter.get('/', async (request, response) => {
    const group = await Event.find({}).populate({path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
    console.log(group)
    response.json(group)
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
        const group = await Group.findById(body.groupId)
        console.log(user)

        if(!user) {
            return response.status(401).json({error: "You cant do that"})
        }

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

  })

  module.exports = eventsRouter