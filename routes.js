var JSX = require('node-jsx').install();
var React = require('react');
var TweetsApp = require('./components/TweetsApp.react');
var Tweet = require('./models/Tweet');

module.exports = {

  //index
  index: function (req, res) {
    //call static model method to get tweets in the db
    Tweet.getTweets(0, 0, function (tweets, pages) {
      //server render
      //render react to a string passing in our fetched tweets
      var markup = React.renderComponentToString(

        TweetsApp({
          tweets: tweets
        })

      );
      //render HOME template
      res.render('home', {
        markup: markup, //pass rendered react markup
        state: JSON.stringify(tweets); //pass current state to client side

      });





    });



  },


  //page
  page: function (req, res) {
    //fetch tweets by page via params
    Tweet.getTweets(req.params.page, req.params.skip, function (tweets) {
      //render json
      res.json(tweets);


    });



  }


};
