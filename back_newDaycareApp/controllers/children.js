const childRouter = require('express').Router()
const mongoose = require('mongoose')

const Child = require('../models/Child')
const {userExtractor } = require('../utils/middleware')
const Parent = require('../models/Parent')


// Get all the children from the db
childRouter.get('/', async (request, response) => {
   const children = await Child.find({}).populate({path: 'care_time', model: 'CareTime'})
   console.log(children)

   response.json(children)
})


// Add new child's information to the db
childRouter.post('/', userExtractor,  async (request, response) => {
    const body = request.body
    console.log(body)
    const user = request.user
    console.log(user)
    if (!user) {
      return response.status(401).json({error: "You cant do that"})
    }
    if (request.body.parents.length == 0) {
      return response.status(400).json({error: "Child has to have at least one parent"})
    }

    const parents = await Parent.find({})
    let helpArray = []
    console.log(parents)
    console.log(body.parents)
    for (i = 0; i < request.body.parents.length; i++) {
      for (p = 0; p < parents.length; p++) {
        console.log(parents[p])
        console.log(request.body.parents[i])
        if (request.body.parents[i].trim().toLowerCase()  === parents[p].name.trim().toLowerCase() ) {
            console.log(parents[p])
            helpArray.push(parents[p].id)
        }
      }
    }


    if (helpArray.length === 0) {
      return response.status(500).send("Something went wrong, couldnt find parents")
    }
    console.log(helpArray)
    // New child-object
    const new_child = new Child({
        name: body.name,
        born: body.born,
        parents: helpArray,
        monthly_maxtime: body.monthly_maxtime,
    })
    
// Save 
   const saved_child = await new_child.save()
   
   response.status(201).json(saved_child)
})

// Get one spesific child's information from the db with id
childRouter.get('/:id', userExtractor, async (request, response) => {
console.log("Child router")
  if (request.user.user_type === 'parent_user') {
    console.log(request.user)
    console.log(request.params.id)
    const findmychild = request.user.children.find(c => c.toString() === request.params.id)
    console.log(findmychild)
    if (!findmychild) {
      console.log("not my")
      response.status(401).json({error: "Not authorized to see this child's info"})
    } else {
      const spesific_child = await Child.findById(request.params.id).populate({path: 'care_time', model: 'CareTime'})
      if (spesific_child) {
        console.log("Found child corrext")
        response.status(200).json(spesific_child)
      } else {
        response.status(404).end()
      }
    }
  }
    const spesific_child = await Child.findById(request.params.id).populate({path: 'care_time', model: 'CareTime'})
    if (spesific_child) {
      response.json(spesific_child)
    } else {
      response.status(404).end()
    }
  })

  childRouter.post('/:id/caretimes', async (request, response) => {
      console.log('Hoitoajan lisäys')
      const kid = await Child.findById(request.params.id)
      console.log(request.body)
      kid.care_time.push({
        date: request.body.date,
        start_time: request.body.start_time,
        end_time: request.body.end_time,
      })

      const updated_times = await Blog.findByIdAndUpdate(request.params.id, kid, {
        new: true,
      }).exec()

      response.status(200).json(updated_times)
  })



  
module.exports = childRouter