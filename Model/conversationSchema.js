// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const messageSchema = require('./messagesSchema'); // Import the message schema

// const conversationSchema = new Schema({
//     clientId: {
//         type: Schema.ObjectId,
//         ref: 'ClientModel',
//         required: false
//     },
//     userId: {
//         type: Schema.ObjectId,
//         ref: 'UserModel',
//         required: false
//     },
//     messagesArray: [messageSchema.schema] // Embed the message schema
// });

// module.exports = mongoose.model('ConversationModel', conversationSchema);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    clientId: {
        type: Schema.ObjectId,
        ref: 'ClientModel',
        required: false
    },
    userId: {
        type: Schema.ObjectId,
        ref: 'UserModel',
        required: false,
        unique: true
    },
    headMessage: {
        type: Schema.ObjectId,
        ref: 'MsgModel',
        default: null
    }
});

module.exports = mongoose.model('ConversationModel', conversationSchema);
