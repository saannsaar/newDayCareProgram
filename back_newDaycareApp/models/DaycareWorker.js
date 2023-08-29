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
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('DaycareWorker', schema)