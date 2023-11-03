const childRouter = require('express').Router()
const mongoose = require('mongoose')

const Child = require('../models/Child')
const {userExtractor } = require('../utils/middleware')
const Parent = require('../models/Parent')

const moment = require('moment')

// Get all the children from the db
childRouter.get('/', userExtractor, async (request, response) => {
  
   const children = await Child.find({})
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

    try {
      const new_child = new Child({
        name: body.name,
        born: body.born,
        parents: helpArray,
        monthly_maxtime: body.monthly_maxtime,
    })
       
    // Save 
    const saved_child = await new_child.save()
    console.log(saved_child)
    for (i = 0; i < helpArray.length; i++) {
     try {
       const updateParent = await Parent.findByIdAndUpdate(helpArray[i], {$push: {"children": saved_child._id}}, {new: true})
       console.log(updateParent)
       await updateParent.save()
     } catch (exc) {
       console.log(exc)
       response.status(400).json({error: "Could not add child to parents children"})
     }
    }
    response.status(201).json(saved_child)

    } catch (error) {
      console.log(error)
      response.status(400).json(error)
      
    }
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
      const spesific_child = await Child.findById(request.params.id)
      if (spesific_child) {
        console.log("Found a correct child")
        
        return response.status(200).json(spesific_child)
      } else {
        return response.status(404).end()
      }
    }
  } else if (request.user.user_type === 'worker_user') {
    const findChild = await Child.findById(request.params.id)
    return response.status(200).json(findChild)
  }

  })

  function countMaxTime(maxtime, caretimes, start_time, end_time) {

    console.log('FUNCTION')
    console.log(maxtime, caretimes, start_time, end_time)
    let monthAddingTo = moment(start_time).format('MM')
    console.log(monthAddingTo)
    console.log(moment(caretimes[0].start_time).format('MM'))
    console.log(moment(caretimes[0].start_time).toString().substring(5,7))
    let thismonthcaretimes = caretimes.filter((c) =>moment(c.start_time).format('MM') == monthAddingTo)
    console.log(thismonthcaretimes)
    let maxtimeMinutes = maxtime * 60
    let count = 0
    for (let i = 0; i < thismonthcaretimes.length; i++) {
      const startDate = moment(thismonthcaretimes[i].start_time)
       const endDate = moment(thismonthcaretimes[i].end_time)
         console.log(endDate.diff(startDate, 'minutes'))
         let dif = endDate.diff(startDate, 'minutes')
         console.log('DIF', dif, typeof dif)
         
         count = dif + count
         console.log('SUMMA', count)
    }
    let addingThis = moment(end_time).diff(moment(start_time), 'minutes')
    let doesItGoOver = count + addingThis
    console.log(maxtimeMinutes)
    if (doesItGoOver <= maxtimeMinutes) {
      const whatsleft = maxtimeMinutes - doesItGoOver
      const usedTime = Math.floor(whatsleft / 60) + ':' + whatsleft % 60
      console.log(usedTime)
      return [true, usedTime]
    } else if (doesItGoOver >  maxtimeMinutes)
    {
      const whatsleft = maxtimeMinutes - count
      const usedTime = Math.floor(whatsleft / 60) + ':' + whatsleft % 60
      console.log(usedTime)
      return [false, usedTime]
    }

  }

  childRouter.post('/:id/caretimes', userExtractor, async (request, response) => {


    if (request.user.user_type === 'parent_user') {
     
      const findmychild = request.user.children.find(c => c.toString() === request.params.id)
    
      if (!findmychild) {
        console.log("not my")
        response.status(401).json({error: "Not authorized to see this child's info"})
      } else {
         
       const startDate = moment(request.body.start_time)
       const endDate = moment(request.body.end_time)
          const spesific_child = await Child.findById(request.params.id)
          
         
          const date = new Date(request.body.start_time)
          const findsame = spesific_child.care_time.filter((c) => new Date(c.start_time).toString().substring(0,10) == date.toString().substring(0,10))
            console.log(findsame) 
            if (findsame.length >= 1) {
              return response.status(401).json({error: 'Cant add multiple caretimes for one day'})
            }
          if (spesific_child && findsame.length == 0 || !findsame) {
            try {
            console.log("Found a correct child")
            const checkk = countMaxTime(spesific_child.monthly_maxtime, spesific_child.care_time, request.body.start_time, request.body.end_time)
            
            if( checkk[0] == false ) {
              console.log('Goes over maxtime', checkk[1])
              return response.status(401).json({error: `${spesific_child.name}'s monthly maxtime is ${spesific_child.monthly_maxtime} hours and it goes over with this addition, child has ${checkk[1]} hours left for this month`})
            }

            console.log('Doesnt go over and has left', checkk[1])
           
                spesific_child.care_time.push({
                  start_time: request.body.start_time,
                  end_time: request.body.end_time,
                  kid_name: spesific_child.name
                })
               
    
                const updated_times = await Child.findByIdAndUpdate(request.params.id, spesific_child, {
                  new: true,
                }).exec()
    
                response.status(201).json(updated_times.care_time[updated_times.care_time.length -1])
              
            
           
         
        } catch (error) {
          response.status(400).json({error: error})
        }
      } 
      }


  }})

  childRouter.put('/:id/caretimes', userExtractor, async (request, response) => {
    console.log('PUT ROUTER')
    if (request.user.user_type === 'parent_user') {
      console.log(request.params.id)
      const findmychild = request.user.children.find(c => c.toString() === request.params.id)
      console.log(findmychild)
      if (!findmychild) {
        console.log("not my")
        response.status(401).json({error: "Not authorized to modify/see this child's info"})
      } else {
        try {
          const spesific_child = await Child.findById(request.params.id)
          if (spesific_child) {
            console.log("Found a correct child")
            
            const checkk = countMaxTime(spesific_child.monthly_maxtime, spesific_child.care_time, request.body.start_time, request.body.end_time)

            if( checkk[0] == false ) {
              console.log('Goes over maxtime', checkk[1])
              return response.status(401).json({error: `${spesific_child.name}'s monthly maxtime is ${spesific_child.monthly_maxtime} hours and it goes over with this addition, child has ${checkk[1]} hours left for this month`})
            }
            console.log(checkk[1])

            let ind = 0
            spesific_child.care_time.forEach((element, index) => {
              if (element._id == request.body._id) {
                ind = index
                spesific_child.care_time[index] = request.body
            }})

           console.log(spesific_child.care_time)
            const updated_times = await Child.findByIdAndUpdate(request.params.id, spesific_child, {
              new: true,
            }).exec()

            response.status(201).json(updated_times.care_time[ind])
          } else {
            response.status(404).end()
          }
        } catch (error) {
          response.status(400).json(error)
        }
      }


  }
  })

  childRouter.delete('/:id1/caretimes/:id2', userExtractor, async (request, response) => {
    console.log('Delete ROUTER', request.params)
    console.log(request.get("Authorization"))

    if (request.user.user_type === 'parent_user') {
      console.log(request.params.id1)
      const findmychild = request.user.children.find(c => c.toString() === request.params.id1)
      console.log(findmychild)
      if (!findmychild) {
        console.log("not my")
        response.status(401).json({error: "Not authorized to modify/see this child's info"})
      } else {
        try {
          const spesific_child = await Child.findById(request.params.id1)
          if (spesific_child) {
            console.log("Found a correct child")
           
            spesific_child.care_time.forEach((element, index) => {
              if (element._id == request.params.id2) {
                spesific_child.care_time.splice(index, 1)

            }})

           console.log(spesific_child.care_time)
            const updated_times = await Child.findByIdAndUpdate(request.params.id, spesific_child, {
              new: true,
            }).exec()

            response.status(204).end()
          } else {
            response.status(404).end()
          }
        } catch (error) {
          response.status(400).json(error)
        }
      } }
  })

  
module.exports = childRouter