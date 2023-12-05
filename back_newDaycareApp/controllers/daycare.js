const daycareRouter = require('express').Router()
const Daycare = require('../models/Daycare')
const logger = require('../utils/logger')

// Get the right daycare from the db
daycareRouter.get('/:id', async (request, response) => {
    try {
        const find_daycare = await Daycare.findById(request.params.id)
        if (find_daycare) {
            response.json(find_daycare)
        } else {
            response.status(404).end()
    }
    } catch (error) {
        logger.error(`GETERROR, USER ${user.name}, ERRORMESSAGE: ${error}`)
    }
   
 })

 module.exports = daycareRouter