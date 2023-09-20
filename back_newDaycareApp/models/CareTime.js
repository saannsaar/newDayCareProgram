const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    start_time: {
        type: Date,
        required: true,
    },
    end_time: {
        type: Date,
        required: true,
    },
    kid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
        required: true
    },
  
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('CareTime', schema)