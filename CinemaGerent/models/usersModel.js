const mongoose = require('mongoose')

let usersSchema = new mongoose.Schema({
    "username" : String,
    "password" : String,
    "mutable" : Boolean
})


module.exports = mongoose.model('users', usersSchema)