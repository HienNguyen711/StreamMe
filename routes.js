var JSX = require('node-jsx').install();
var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');
var Tweet = require('./models/Tweet');

module.exports = {















  //page
  page: function(req,res){
    //fetch tweets by page via params
    Tweet.getTweets(req.params.page,req.params.skip,function(tweets){
      //render json
      res.json(tweets);


    });



  }


};
