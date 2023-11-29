const mongoose = require('mongoose')

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
    parents: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent'
    }],
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    monthly_maxtime: {
        type: Number,
        required: true,
    },
    care_time: [
        {start_time: {
        type: Date
    },
        end_time: {
            type: Date
        },
        kid_name: {
            type: String,
            required: true,
        }}
    ],
    caretimes_added_monthlysum: [
        {month: { 
            type: String,
            required: true,
            unique: true},
        timeLeft: {
            type: Number,
            required: true

        }}
    ],
    diapers: {
        type: String,
        enum: ["FULL", "HALF", "EMPTY"],
        default: "FULL",
        required: true,
    }
    
})

schema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Child', schema)