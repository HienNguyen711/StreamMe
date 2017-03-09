var mongoose = require('mongoose');
//create new schema
var schema = new mongoose.Schema({
    twid       : String,
    active     : Boolean,
    author     : String,
    avatar     : String,
    body       : String,
    date       : Date,
    screenname : String




});
