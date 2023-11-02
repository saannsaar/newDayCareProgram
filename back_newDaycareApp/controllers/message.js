const messageRouter = require('express').Router()

const mongoose = require('mongoose')

const Message = require('../models/Message')
const {userExtractor } = require('../utils/middleware')
const DaycareWorker = require('../models/DaycareWorker')
const Parent = require('../models/Parent')

messageRouter.get('/:receiver', userExtractor, async (request, response) => {
   
    if (request.params.receiver) {
         const findReceiver = await Parent.findById(request.params.receiver)
         if (!findReceiver) {
            const finddReceiver = await DaycareWorker.findById(request.params.receiver)
            console.log(finddReceiver._id)
            console.log(request.user._id)
            const conversations = await Message.find({ $or: [
               { $and: [ {receiver: finddReceiver._id},  {sender: request.user._id  } ]},
               { $and: [ {receiver: request.user._id },  {sender: finddReceiver._id } ]}
           ]  })
           
           console.log('HALOO', conversations)
           response.status(200).json(conversations)
            
         } else {
          
           console.log(findReceiver._id)
            console.log(request.user._id)
            const conversations = await Message.find({ $or: [
               { $and: [ {receiver: findReceiver._id},  {sender: request.user._id  } ]},
               { $and: [ {receiver: request.user._id },  {sender: findReceiver._id } ]}
           ]  })
           
           console.log('HALOO', conversations)
           response.status(200).json(conversations)
         }
         
    } else {
        const conversations = await Message.find({ $or: [ { sender: request.user._id }, {receiver: request.user._id }]})
        response.status(200).json(conversations)
    }
    


})

messageRouter.post('/', userExtractor, async (request, response) => {
    console.log('message router')
    if (!request.user ) {
        return response.status(401).json({error: 'You are not authorized to send messages.'})
    } 
    const findReceiver = await Parent.findOne({name: request.body.receiver})
    console.log('Löytyks vanhempi', findReceiver)
    if (!findReceiver) {
      
        try {
            console.log('Viesti menee työntekijälle')
            const findReceiverr = await DaycareWorker.findOne({ name: request.body.receiver })
            console.log('MOI')
            console.log('receiver', findReceiverr._id)
            console.log('sender', request.user._id)
            const newMessage = new Message({
                content: request.body.content,
                sender: request.user._id,
                receiver: findReceiverr._id
            })  
            console.log(newMessage)

            const saved_message = await newMessage.save()
            request.user.messages.push(saved_message._id)
            await request.user.save()
            findReceiverr.messages.push(saved_message._id)
            await findReceiverr.save()
            console.log(saved_message) 
            response.status(201).json(saved_message)
        } catch(error) {
            response.status(400).json(error)
        }
        
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