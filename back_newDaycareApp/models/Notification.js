const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  headingtext: {
    type: String,
    required: true,
  },
  contenttext: {
    type: String,
    required: true,
  }, 
  toParents: {
    type: Boolean,
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

module.exports = mongoose.model('Notification', schema)