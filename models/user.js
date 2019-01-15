
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var connection=mongoose.createConnection("mongodb://localhost/ApnaIlaka",{ useNewUrlParser: true });


module.exports = connection.model('user', {
    username: String,
    name:String,
    email: String,
    password: String,
    date:{type:Number,default:Date.now()}
},'user');