var Tweet = require('../models/Tweet');

module.exports = function (stream, io {
      stream.on('data', function (data) {
        //construct a new tweet obj
        var tweet = {

          twid: data['id'],
          active: false,
          author: data['user']['name'],
          avatar: data['user']['profile_image_url'],
          body: data['text'],
          date: data['created_at'],
          screenname: data['user']['screen_name']
       };


        //create a new model
        var tweetEntry = new Tweet(tweet);

        //save to the mongodb database
        tweetEntry.save(function (err) {
          if (!err) {

            //socket.io emit the tweet
            io.emit('tweet', tweet);

          }

        });


      });


    };
