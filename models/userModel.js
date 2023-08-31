const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const UserModel = new Schema({
    name:{
        type: String,
        required: [true, 'please add  name']
    },
    email:{
        type: String,
        required: [true, 'please add email'],
        unique:true
    },
    password:{
        type: String,
        required: [true, 'please add password']
    }
})
module.exports = mongoose.model('User', UserModel)