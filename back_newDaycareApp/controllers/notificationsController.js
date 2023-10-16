// TODO

const mongoose = require('mongoose')

const notificationRouter = require('express').Router()
const {userExtractor } = require('../utils/middleware')
const Notification = require('../models/Notification')

notificationRouter.get('/', userExtractor, async (request,response) => {
    if (!request.user) {
        return response.status(401).json({message: 'You must be logged in to view notifications'})
    }

    if (request.user.user_type == 'parent_user') {
        const notifications = await Notification.find({toParents: true})
        response.json(notifications)
    } else {
        const notifications = await Notification.find({})
        response.json(notifications)
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
        })

        const saved_notification = await new_notification.save()
        console.log(saved_notification)
        response.status(201).json(saved_notification)
    } catch (error) {
        console.log(error)
        response.status(400).json(error)
    }




})

module.exports = notificationRouter
