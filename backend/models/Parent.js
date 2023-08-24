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
    type: Date,
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
  children: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child'
    }
  ],
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Parent', schema)