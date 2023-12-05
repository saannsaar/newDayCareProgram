// TODO

const mongoose = require('mongoose')

const notificationRouter = require('express').Router()
const {userExtractor } = require('../utils/middleware')
const Notification = require('../models/Notification')
const logger = require('../utils/logger')

notificationRouter.get('/', userExtractor, async (request,response) => {
    if (!request.user) {
        return response.status(401).json({message: 'You must be logged in to view notifications'})
    }
    try {
        if (request.user.user_type == 'parent_user') {
            const notifications = await Notification.find({toParents: true})
            response.json(notifications)
        } else {
            const notifications = await Notification.find({})
            response.json(notifications)
        }
    } catch (error) {
        logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
    }
   
  
})

notificationRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user || user.user_type == 'parent_user') {
        return response.status(401).json({error: 'You are not authorized to add notifications.'})
    } 

    try {
        const new_notification = new Notification({
            headingtext: body.headingtext,
            contenttext: body.contenttext,
            toParents: body.toParents,
            colorCode: body.colorCode ? body.colorCode : null
        })

        const saved_notification = await new_notification.save()
        response.status(201).json(saved_notification)
    } catch (error) {
        
        response.status(400).json(error)
       
        logger.error(`POSTERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
    }

})

notificationRouter.delete('/:id', userExtractor, async (request, response) => {
    if (request.user.user_type == 'parent_user') {
        logger.error(`DELETEERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
        return response.status(401).json({error: 'You are not authorized to delete notifications.'})
        
    }
    const findNoti = await Notification.deleteOne({ _id: request.params.id })
    response.status(204).end()
})

module.exports = notificationRouter
