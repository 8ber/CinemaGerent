const mongoose = require('mongoose')

let subscriptionsSchema = new mongoose.Schema({
    memberid : mongoose.ObjectId,
    "movieid":mongoose.ObjectId,
    "date":Date
})


module.exports = mongoose.model('subscriptions', subscriptionsSchema)