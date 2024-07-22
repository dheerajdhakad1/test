const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    time_used:{
        type: Number,
        required: false
    }
});
 module.exports = mongoose.model('UserModel', userSchema)