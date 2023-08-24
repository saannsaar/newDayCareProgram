const mongoose = require('mongoose')

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
    parents: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }],
    group: {
        type: String,
        required: true,
        unique: false,
    },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Child', schema)