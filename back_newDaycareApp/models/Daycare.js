const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    workers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DaycareWorker',
    }],
    parents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }],
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    }],
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Daycare', schema)