const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    born: {
        type: String,
        required: true,
    },
    parents: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    monthly_maxtime: {
        type: String,
        required: true,
    },
    care_time: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareTime',
    }],
    
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Child', schema)