const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

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
  group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user_type: {
    type: String,
    value: 'worker_user',
    required: true
  },
  passwordHash: String,
})

schema.plugin(uniqueValidator)
schema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

module.exports = mongoose.model('DaycareWorker', schema)