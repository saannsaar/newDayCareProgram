const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
  user_type: {
    type: String,
    value: 'parent_user',
    required: true
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }],
  passwordHash: String,

})

schema.plugin(uniqueValidator)
schema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete passwordHash
  }
})

module.exports = mongoose.model('Parent', schema)