const mongoose = require('mongoose')



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
  daycare: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Daycare',
  },
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
  }
})

module.exports = mongoose.model('Parent', schema)