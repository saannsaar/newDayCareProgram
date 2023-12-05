const messageRouter = require('express').Router()

const mongoose = require('mongoose')
const logger = require('../utils/logger')
const Message = require('../models/Message')
const {userExtractor } = require('../utils/middleware')
const DaycareWorker = require('../models/DaycareWorker')
const Parent = require('../models/Parent')

messageRouter.get('/:receiver', userExtractor, async (request, response) => {
   try {
    if (request.params.receiver) {

        const findReceiver = await Parent.findById(request.params.receiver)
        if (!findReceiver) {

           const finddReceiver = await DaycareWorker.findById(request.params.receiver)
           
           const conversations = await Message.find({ $or: [
              { $and: [ {receiver: finddReceiver._id},  {sender: request.user._id  } ]},
              { $and: [ {receiver: request.user._id },  {sender: finddReceiver._id } ]}
          ]  })
          response.status(200).json(conversations)
           
        } else {

           const conversations = await Message.find({ $or: [
              { $and: [ {receiver: findReceiver._id},  {sender: request.user._id  } ]},
              { $and: [ {receiver: request.user._id },  {sender: findReceiver._id } ]}
          ]  })
          
          response.status(200).json(conversations)
        }
        
   } else {
       const conversations = await Message.find({ $or: [ { sender: request.user._id }, {receiver: request.user._id }]})
       response.status(200).json(conversations)
   }
   } catch (error) {
    logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
   }    
    


})


messageRouter.post('/', userExtractor, async (request, response) => {
    if (!request.user ) {
        return response.status(401).json({error: 'You are not authorized to send messages.'})
    } 
    const findReceiver = await Parent.findOne({name: request.body.receiver})
    if (!findReceiver) {
      
        try {
            const findReceiverr = await DaycareWorker.findOne({ name: request.body.receiver })
            const newMessage = new Message({
                content: request.body.content,
                sender: request.user._id,
                receiver: findReceiverr._id
            })  

            const saved_message = await newMessage.save()
            request.user.messages.push(saved_message._id)
            await request.user.save()
            findReceiverr.messages.push(saved_message._id)
            await findReceiverr.save()
            response.status(201).json(saved_message)
        } catch(error) {
            response.status(400).json(error)
            logger.error(`POSTERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
        }
        
    } else {

        try {
            const newMessage = new Message({
                content: request.body.content,
                sender: request.user._id,
                receiver: findReceiver._id
            })  

            const saved_message = await newMessage.save()
            request.user.messages.push(saved_message._id)
            await request.user.save()
            findReceiver.messages.push(saved_message._id)
            await findReceiver.save()
            response.status(201).json(saved_message)
        } catch(error) {
            response.status(400).json(error)
            logger.error(`POSTERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
        }
    }
  
    
   
})

module.exports = messageRouter