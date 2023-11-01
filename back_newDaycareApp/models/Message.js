const mongoose = require('mongoose')

// you must install this library
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DaycareWorker' || 'Parent'
  }, 
 receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent' || 'DaycareWorker'
 },

},  {timestamps: true})

schema.plugin(uniqueValidator)

schema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

module.exports = mongoose.model('Message', schema)