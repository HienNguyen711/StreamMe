var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var twitter = require('ntwitter');
var routes = require('./routes');
var config = require('./config');
var streamHandler = require('./utils/streamHandler');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.disable('etag');


//connect to mongodb
mongoose.connect('mongodb://localhost/react-tweets');
