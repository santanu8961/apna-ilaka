
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var connection=mongoose.createConnection("mongodb://localhost/ApnaIlaka",{ useNewUrlParser: true });


module.exports = connection.model('Status/posts', {
    username: String,
    name:String,
    email: String,
    post:String,
    date:{type:Date,default:Date.now()}
},'Status/posts');