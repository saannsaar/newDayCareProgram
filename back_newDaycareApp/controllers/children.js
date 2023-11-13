const childRouter = require('express').Router()
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
    const user = request.user
    if (!user) {
      return response.status(401).json({error: "You cant do that"})
    }
    if (request.body.parents.length == 0) {
      return response.status(400).json({error: "Child has to have at least one parent"})
    }

    const parents = await Parent.find({})
    let helpArray = []
    for (i = 0; i < request.body.parents.length; i++) {
      for (p = 0; p < parents.length; p++) {
        if (request.body.parents[i].trim().toLowerCase()  === parents[p].name.trim().toLowerCase() ) {
            helpArray.push(parents[p].id)
        }
      }
    }


    if (helpArray.length === 0) {
      return response.status(500).send("Something went wrong, couldnt find parents")
    }
   
    try {
      // New child-object
      const new_child = new Child({
        name: body.name,
        born: body.born,
        parents: helpArray,
        monthly_maxtime: body.monthly_maxtime,
    })
       
    // Save 
    const saved_child = await new_child.save()

    for (i = 0; i < helpArray.length; i++) {
     try {
       const updateParent = await Parent.findByIdAndUpdate(helpArray[i], {$push: {"children": saved_child._id}}, {new: true})
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
  console.log(request.user)
  if (request.user.user_type === 'parent_user') {
    console.log('parent router')
    const findmychild = request.user.children.find(c => c.toString() === request.params.id)
    if (!findmychild) {
      response.status(401).json({error: "Not authorized to see this child's info"})
    } else {
      const spesific_child = await Child.findById(request.params.id)
      if (spesific_child) { 
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
  // Function that takes child's maxtime, all the caretimes as an array, start_time and end_time of the new
  // caretime that is added/modified and sums caretimes from that month
  // Returns how much times child has left for the specific month and also if the maxtime
  // goes over with this addition/modification
  function countMaxTime(maxtime, caretimes, start_time, end_time) {
    console.log(maxtime, caretimes, start_time, end_time)
    let monthAddingTo = moment(start_time).format('MM')
    let thismonthcaretimes = caretimes.filter((c) =>moment(c.start_time).format('MM') == monthAddingTo)

    let maxtimeMinutes = maxtime * 60
    let count = 0

    for (let i = 0; i < thismonthcaretimes.length; i++) {

      const startDate = moment(thismonthcaretimes[i].start_time)
      const endDate = moment(thismonthcaretimes[i].end_time)
      let dif = endDate.diff(startDate, 'minutes')
      count = dif + count

    }

    let addingThis = moment(end_time).diff(moment(start_time), 'minutes')
    let doesItGoOver = count + addingThis

    if (doesItGoOver <= maxtimeMinutes) {

      const whatsleft = maxtimeMinutes - doesItGoOver
      return [true, whatsleft, monthAddingTo]

    } else if (doesItGoOver >  maxtimeMinutes) {

      const whatsleft = maxtimeMinutes - count
      return [false, whatsleft]

    }

  }


  childRouter.post('/:id/caretimes', userExtractor, async (request, response) => {


    if (request.user.user_type === 'parent_user') {
     
      const findmychild = request.user.children.find(c => c.toString() === request.params.id)
    
      if (!findmychild) {

        response.status(401).json({error: "Not authorized to see this child's info"})

      } else {
         
      
          const spesific_child = await Child.findById(request.params.id)
          
         
          const date = new Date(request.body.start_time)
          const findsame = spesific_child.care_time.filter((c) => new Date(c.start_time).toString().substring(0,10) == date.toString().substring(0,10))
            if (findsame.length >= 1) {
              return response.status(401).json({error: 'Cant add multiple caretimes for one day'})
            }
          if (spesific_child && findsame.length == 0 || !findsame) {
            try {
            console.log("Found a correct child")
            const checkk = countMaxTime(spesific_child.monthly_maxtime, spesific_child.care_time, request.body.start_time, request.body.end_time)
            
            if( checkk[0] == false ) {
              console.log('Goes over maxtime', checkk[1])
              const timeLeftAsString = Math.floor(checkk[1] / 60) + ':' + checkk[1] % 60
              // ! These kind of error responses are probably not the most best idea
              // considering security issues
              return response.status(401).json({error: `${spesific_child.name}'s monthly maxtime is ${spesific_child.monthly_maxtime} hours and it goes over with this addition, child has ${timeLeftAsString} hours left for this month`})
            }
           
                spesific_child.care_time.push({
                  start_time: request.body.start_time,
                  end_time: request.body.end_time,
                  kid_name: spesific_child.name
                })
                console.log("MONTH", checkk[2])
                console.log(checkk[1])
                const findMonth = spesific_child.caretimes_added_monthlysum.filter((m)=> m.month == checkk[2])
                console.log(findMonth)
                const timeLeftAsString = Math.floor(checkk[1] / 60) + ':' + checkk[1] % 60
                console.log(timeLeftAsString)

                if (findMonth.length == 0) {
                  console.log("EI OLLU")
                  spesific_child.caretimes_added_monthlysum.push({
                    month: checkk[2],
                    timeLeft: checkk[1],
                  })
                  console.log(spesific_child.caretimes_added_monthlysum)

                } else {
                  spesific_child.caretimes_added_monthlysum.forEach((element, index) => {
                    console.log(element)
                    if (element.month == checkk[2]) {
                      ind = index
                      console.log(ind)
                      const changetime = {
                        month: spesific_child.caretimes_added_monthlysum[ind].month,
                        timeLeft: checkk[1],
                        _id: spesific_child.caretimes_added_monthlysum[ind].month_id
                      }
                      console.log("TÄMÄ", spesific_child.caretimes_added_monthlysum[ind])
                      spesific_child.caretimes_added_monthlysum[ind] = changetime
                  }})
                  console.log("MUUTTUKO", spesific_child.caretimes_added_monthlysum)
                }

                const updated_times = await Child.findByIdAndUpdate(request.params.id, spesific_child, {
                  new: true,
                }).exec()
                console.log(" PÄIVITETTY", updated_times)
                response.status(201).json(updated_times)

        } catch (error) {
          response.status(400).json({error: error})
        }
      } 
      }


  }})

  childRouter.put('/:id/caretimes', userExtractor, async (request, response) => {

    if (request.user.user_type === 'parent_user') {
      const findmychild = request.user.children.find(c => c.toString() === request.params.id)

      if (!findmychild) {
        response.status(401).json({error: "Not authorized to modify/see this child's info"})

      } else {

        try {
          const spesific_child = await Child.findById(request.params.id)
          if (spesific_child) {
            const checkk = countMaxTime(spesific_child.monthly_maxtime, spesific_child.care_time, request.body.start_time, request.body.end_time)

            if( checkk[0] == false ) {
              return response.status(401).json({error: `${spesific_child.name}'s monthly maxtime is ${spesific_child.monthly_maxtime} hours and it goes over with this addition, child has ${checkk[1]} hours left for this month`})
            }

            let ind = 0
            spesific_child.care_time.forEach((element, index) => {
              if (element._id == request.body._id) {
                ind = index
                spesific_child.care_time[index] = request.body
            }})
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
    if (request.user.user_type === 'parent_user') {
      const findmychild = request.user.children.find(c => c.toString() === request.params.id1)
      if (!findmychild) {

        response.status(401).json({error: "Not authorized to modify/see this child's info"})
      } else {
        try {
          const spesific_child = await Child.findById(request.params.id1)
          if (spesific_child) {
           
            spesific_child.care_time.forEach((element, index) => {
              if (element._id == request.params.id2) {
                const minusThisTime = moment(element.end_time).diff(moment(element.start_time), 'minutes')
                
                spesific_child.caretimes_added_monthlysum.forEach((newElem, index) => {
                  console.log(newElem)
                  if (newElem.month == moment(element.start_time).format('MM')) {
                    ind = index
                    console.log(ind)
                    const newTime = spesific_child.caretimes_added_monthlysum[ind].timeLeft - parseInt(minusThisTime)
                    const changetime = {
                      month: spesific_child.caretimes_added_monthlysum[ind].month,
                      timeLeft: newTime,
                      _id: spesific_child.caretimes_added_monthlysum[ind].month_id
                    }
                    spesific_child.caretimes_added_monthlysum[ind] = changetime
                   }})
                

                spesific_child.care_time.splice(index, 1)

            }})
           
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