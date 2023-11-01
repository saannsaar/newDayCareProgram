const messageRouter = require('express').Router()

const mongoose = require('mongoose')

const Message = require('../models/Message')
const {userExtractor } = require('../utils/middleware')
const DaycareWorker = require('../models/DaycareWorker')
const Parent = require('../models/Parent')

messageRouter.get('/', userExtractor, async (request, response) => {

    const conversations = await Message.find({ $or: [ { sender: request.user.id }, {receiver: request.user.id }]})
   
    if (request.body.receiver) {
         const findReceiver = await Parent.findOne({ name: request.body.receiver })
        const spesificConversation = conversation.filter((c) => c.receiver == findReceiver._id)
        response.json(conversations)
    }
    response.json(conversations)


})

messageRouter.post('/', userExtractor, async (request, response) => {
    console.log('message router')
    if (!request.user ) {
        return response.status(401).json({error: 'You are not authorized to send messages.'})
    } 
    const findReceiver = await Parent.findOne({name: request.body.receiver})
    console.log('Löytyks', findReceiver)
    if (!findReceiver) {
      
            response.status(400).json(error)
        
    }
        try {
            console.log('MOI')
            console.log('receiver', findReceiver._id)
            console.log('sender', request.user._id)
            const newMessage = new Message({
                content: request.body.content,
                sender: request.user._id,
                receiver: findReceiver._id
            })  
            console.log(newMessage)

            const saved_message = await newMessage.save()
            request.user.messages.push(saved_message._id)
            await request.user.save()
            findReceiver.messages.push(saved_message._id)
            await findReceiver.save()
            console.log(saved_message) 
            response.status(201).json(saved_message)
        } catch(error) {
            response.status(400).json(error)
        }
  
    
   
})

module.exports = messageRouter