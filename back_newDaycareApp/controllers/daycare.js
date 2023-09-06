const daycareRouter = require('express').Router()
const Daycare = require('../models/Daycare')


// Get the right daycare from the db
daycareRouter.get('/:id', async (request, response) => {
    const find_daycare = await Daycare.findById(request.params.id)
    if (find_daycare) {
        response.json(find_daycare)
    } else {
        response.status(404).end()
    }
 })

 module.exports = daycareRouter