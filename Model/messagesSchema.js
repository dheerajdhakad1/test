const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'UserModel',
        required: false
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    nextMessage: {
        type: Schema.ObjectId,
        ref: 'MsgModel',
        default: null
    }
});

module.exports = mongoose.model('MsgModel', messageSchema);
