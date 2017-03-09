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

schema.statics.getTweets = function(page,skip, cb){
  var tweets = [];
  var start = (page*10)+(skip*1);

  //query the db
  Tweet.find({},'twid active author avatar body date screenname',{skip: start, limit: 10}).sort({date: 'desc'}).exec(function(err,docs){

   //if no error
    if(!err) {
      tweets = docs;
      tweets.forEach(function(tweet){
        tweet.active = true; //set tweet is active
      });
    }

    // Pass them back to the specified callback
    cb(tweets);

  });

};

// Return a Tweet model based upon the defined schema
module.exports = Tweet = mongoose.model('Tweet', schema);
