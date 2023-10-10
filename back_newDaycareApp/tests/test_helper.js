const Child = require('../models/Child')
const Worker = require('../models/DaycareWorker')
const Event = require('../models/Event')
const Parent = require('../models/Parent')
const Group = require('../models/Group')

const initialChildren = [
    {
      _id: "5a422a851b54a676234d17f7",
      name: "Weston Kirk",
      born: "13.02.2021",
      monthly_maxtime: '130h',
      parents: ["5a422aa71b54a676234d17f8", "9w391aa71b54a676283d17e0"],
      __v: 0
    },
    {
      _id: "5a313da71b54a676234d19y5",
      name: "Mary Lee",
      born: "02.05.2021",
      monthly_maxtime: '130h',
      parents: ["7w441fc82b54d676283q17p0"],
      __v: 0
    },
    {
        _id: "5a313da90b54a676234d197c",
        name: "Mindy Gilbert",
        born: "27.08.2020",
        monthly_maxtime: '130h',
        parents: ["7w441fc82b54d676283q17p0"],
        __v: 0
      },

  ]


  const initialParents = [
    {
      _id: "5a422aa71b54a676234d17f8",
      name: "Caroline Forbes-Kirk",
      password: "salasana1",
      phone: "2212121212",
      user_type: "parent_user",
      email: "caroline.forbeskirk@emailaddress.com",
      children: [],
      __v: 0
    },
    {
      _id: "64e70b12d2ec240813742ae4",
      name: "Phoebe Kirk",
      password: "salis1",
      phone: "2212123331212",
      user_type: "parent_user",
      children: [],
      email: "phoebe.kirk.work@emailaddress.com",
      __v: 0
    },
    {
        _id: "64e733b904b6410b16348158",
        name: "Klaus Richards",
        password: "salis2",
        email: "klaus.richards@emailaddress.com",
        phone: "2212123331211111",
        user_type: "parent_user",
        children: [],
        __v: 0
      }
  ]

const initializeWorkers = [
    {
        _id: "64e708d2d2ec240813742ae9",
        name: "Claire Dundret",
        born: "19.11.1989",
        email: "clairedundret@emailaddress.com",
        phone: "+358123123123123",
        group: "3v422s851b54a676234d17f0",
        __v: 0
      },
      {
        _id: "64eede26441493d0c737b47d",
        name: "Hailey Bee",
        born: "09.12.1994",
        email: "haileybeebee@emailaddress.com",
        phone: "+3581211111111",
        group: "7v411s851b54a676234d17p9",
        __v: 0
      },
]

const initialEvents = [

    {
        _id: "4eeffcdf0de070a608d607e",
        name: "Metsäretki",
        date: "2023-10-23T09:00:00.000+00:00",
        event_type: "C_event",
        info: "Mestäretki metsään, eväät mukaan, tutkitaan kaarnoja",
        group: "3v422s851b54a676234d17f0",
        __v: 0
    },
    {
        _id: "64ef0040f0de070a608d6084",
        name: "Pikkujoulut",
        date: "2023-11-23T09:00:00.000+00:00",
        event_type: "C_event",
        info: "Koko päiväkodin pikkujoulut lapsille",
        group: ["3v422s851b54a676234d17f0", "7v411s851b54a676234d17p9"],
        __v: 0
    }
]

const initialGroups = [
        
    {  
        _id: "3v422s851b54a676234d17f0",
        name: "Pikkusten ryhmä",
        workers_in_charge: ["64e708d2d2ec240813742ae9"],
        children: ["5a422a851b54a676234d17f7", "5a313da71b54a676234d19y5"],
        events: ["4eeffcdf0de070a608d607e", "64ef0040f0de070a608d6084"],
        __v: 0
    },

    {  
        _id: "7v411s851b54a676234d17p9",
        name: "Isompien ryhmä",
        workers_in_charge: ["64eede26441493d0c737b47d"],
        children: ["5a313da90b54a676234d197c"],
        events: ["64ef0040f0de070a608d6084"],
        __v: 0
    }

]

const initialDaycare = [

    {
        _id: "9a422cx71b54a813234d17z8",
        name: "Päiväkoti Pikkutähtönen",
        phone: "+2323232323232323",
        workers: ["64e708d2d2ec240813742ae9", "64eede26441493d0c737b47d"],
        children: ["5a422a851b54a676234d17f7", "5a313da71b54a676234d19y5", "5a313da90b54a676234d197c"],
        parents: ["5a422aa71b54a676234d17f8", "9w391aa71b54a676283d17e0", "7w441fc82b54d676283q17p0"],
        groups: ["3v422s851b54a676234d17f0","7v411s851b54a676234d17p9"],
        address: "Tähtipöly 1, 00001 Sateenkaarisilta",
        email: "paivakoti.pikkutahtonen@emaill.com",
        events: ["64ef0040f0de070a608d6084", "4eeffcdf0de070a608d607e"]
    }
]

const nonExistingId = async () => {
    const worker = new Worker({
        name: "willremovethissoon",
        born: "willrremoveethissoon",
        email: "willremovethissoon",
        phone: "willremovethissoon",
    })

    await worker.save()
    await worker.remove()
   
    return worker._id.toString()
}

const childrenInDb = async () => {
    const children = await Child.find({})
    return children.map(kid => kid.toJSON())
}

const eventsInDb = async () => {
    const events = await Event.find({})
    return events.map(event => event.toJSON())
}

const parentsInDb = async () => {
    const parents = await Parent.find({})
    return parents.map(parent => parent.toJSON())
}

const groupsInDb = async () => {
    const groups = await Group.find({})
    return groups.map(group => group.toJSON())
}

const workersInDb = async () => {
    const workers = await Worker.find({})
    return workers.map(worker => worker.toJSON())
}

module.exports = {
    initialChildren, initialParents, initializeWorkers, initialEvents, initialGroups, initialDaycare, nonExistingId, childrenInDb, parentsInDb, workersInDb, groupsInDb, eventsInDb
   }