const bcrypt = require('bcrypt')
const workerRouter = require('express').Router()
const mongoose = require('mongoose')

const DaycareWorker = require('../models/DaycareWorker')
const {userExtractor } = require('../utils/middleware')


// Haetaan kaikki työntekijät tietokannasta
workerRouter.get('/', async (request, response) => {
   const workers = await DaycareWorker.find({}).populate({path: 'group', model: 'Group', populate: {path: 'workers_in_charge', model: 'DaycareWorker'}})
   console.log(workers)
   response.json(workers)
})


// Lisätään uusi työntekijä tietokantaan
workerRouter.post('/', userExtractor,  async (request, response) => {
    const {email, name, born, phone, password} = request.body

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
})


workerRouter.get('/:id', async (request, response) => {
    const spesific_worker = await DaycareWorker.findById(request.params.id).populate('group').populate('user_type')
    if (spesific_worker) {
      response.json(spesific_worker)
    } else {
      response.status(404).end()
    }
  })

  workerRouter.put('/:id', async(request, response, next) => {
    try {
        const worker = await DaycareWorker.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        }).exec()
        response.json(worker)
    } catch(error) {
        next(error)
    }
  })

  module.exports = workerRouter