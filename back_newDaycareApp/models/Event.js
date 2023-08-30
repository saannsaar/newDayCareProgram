const mongoose = require('mongoose')

const childevent = 'C_event'
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    event_type: {
        type: String,
        enum: {
            values: ['W_event', 'C_event', 'P_event']
        }
    },
    info: {
        type: String,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: isChildEvent
    }
}, {timestamps: true})


function isChildEvent() {
    if (childevent.indexOf(this.event_type) > -1) {
        return true;
    }
    return false;
}

module.exports = mongoose.model('Event', schema)