const bcrypt = require('bcrypt')
const workerRouter = require('express').Router()
const mongoose = require('mongoose')

const DaycareWorker = require('../models/DaycareWorker')
const {userExtractor } = require('../utils/middleware')
const logger = require('../utils/logger')


// Haetaan kaikki työntekijät tietokannasta
workerRouter.get('/', userExtractor, async (request, response) => {
   const workers = await DaycareWorker.find({}).populate({path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
   response.json(workers)
})


// Lisätään uusi työntekijä tietokantaan
workerRouter.post('/', userExtractor,  async (request, response) => {
   try {
    const {email, name, born, phone, password, user_type} = request.body

    const saltRounds = 10 
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new DaycareWorker({
        email,
        name,
        born,
        phone,
        user_type,
        passwordHash,
    })

    const saved_worker = await user.save()

    response.status(201).json(saved_worker)
   } catch (error) {
    logger.error(`POSTERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
   }
})


workerRouter.get('/:id', userExtractor, async (request, response) => {

  if (!request.user) {
    return response.status(403).send("You are not logged in")
  } else {
    try {
      const spesific_worker = await DaycareWorker.findById(request.params.id).populate('group').populate('user_type')
        response.json(spesific_worker)
    } catch(error) {
      logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
      next(error)

    }
  }
})
 

  workerRouter.put('/:id', userExtractor, async(request, response, next) => {
    try {
        const worker = await DaycareWorker.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        }).exec()
        response.json(worker)
    } catch(error) {
      logger.error(`PUTERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
        next(error)
    }
  })

  module.exports = workerRouter