
var mongoose = require('mongoose');


module.exports = mongoose.model('user', {

    username: String,
    name:String,
    email: String,
    password: String,
    date:{type:Number,default:Date.now()}
},'user');