const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  workers_in_charge: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DaycareWorker'
  }], 
  children: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    }
  ],
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

module.exports = mongoose.model('Group', schema)