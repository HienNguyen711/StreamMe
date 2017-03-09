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

//create new ntweeter instance
var twit = new twitter(config.twitter);

//create route
app.get('/',routes.index);

app.get('/page/:page/:skip',routes.page);


app.use('/',express.static(__dirname+'/public/'));

//
var server = http.createServer(app).listen(port,function(){
  console.log('Listening on port '+port);
});
//init socket
var io = require('socket.io').listen(server);

//set a stream listener for tweets matching tracking keywords
twit.stream('statuses/filter',{track:'reactjs,#reactjs'},function(stream){
  streamHandler(stream,io);//streamHandle
});

