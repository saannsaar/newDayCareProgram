const router = require('express').Router()
const Parent = require('../models/Parent')
const Worker = require('../models/DaycareWorker')
const Child = require('../models/Child')
const Daycare = require('../models/Daycare')
const Event = require('../models/Event')
const Group = require('../models/Group')

//Alustetaan tietokanta testejä varten
router.post('/reset', async (request, response) => {
    await Parent.deleteMany({})
    await Worker.deleteMany({})
    await Child.deleteMany({})
    await Daycare.deleteMany({})
    await Event.deleteMany({})
    await Group.deleteMany({})

    response.status(204).end()
})

module.exports = router