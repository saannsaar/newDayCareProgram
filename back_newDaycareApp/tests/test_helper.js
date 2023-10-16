const Child = require('../models/Child')
const Worker = require('../models/DaycareWorker')
const Event = require('../models/Event')
const Parent = require('../models/Parent')
const Group = require('../models/Group')

const initialChildren = [
    {
      _id: "6526595cd5caab3108c41444",
      name: "Weston Kirk",
      born: "13.02.2021",
      monthly_maxtime: '130h',
      parents: [],
      __v: 0
    },
    {
      _id: "6526596b1d5a33124b6d3273",
      name: "Mary Lee",
      born: "02.05.2021",
      monthly_maxtime: '130h',
      parents: [],
      __v: 0
    },
    {
        _id: "65265971ed5419ae19531d5c",
        name: "Mindy Gilbert",
        born: "27.08.2020",
        monthly_maxtime: '130h',
        parents: [],
        __v: 0
      },

  ]


  const initialParents = [
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
        _id: "6528f02c5b30c79ea062243a",
        name: "Metsäretki",
        date: "2023-10-23T09:00:00.000+00:00",
        event_type: "C_event",
        info: "Mestäretki metsään, eväät mukaan, tutkitaan kaarnoja",
        group: "6528d3cc0da4556ae5091db8",
        __v: 0
    },
    {
        _id: "6528f0383a9ec48b5027821f",
        name: "Pikkujoulut",
        date: "2023-11-23T09:00:00.000+00:00",
        event_type: "C_event",
        info: "Koko päiväkodin pikkujoulut lapsille",
        group: ["6528d3cc0da4556ae5091db8", "6528f065e52e35ad84a8f9ce"],
        __v: 0
    }
]

const initialGroups = [
        
    {  
        _id: "6528d3cc0da4556ae5091db8",
        name: "Pikkusten ryhmä",
        workers_in_charge: [],
        children: [],
        events: [],
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