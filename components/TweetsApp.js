var React = require('react');

module.exports = TweetsApp = React.createClass({

  getInitialState: function(props){

    props = props || this.props;

    // Set initial application state using props
    return {
      tweets: props.tweets,
      count: 0,
      page: 0,
      paging: false,
      skip: 0,
      done: false
    };

  },

  componentWillReceiveProps: function(newProps, oldProps){
    this.setState(this.getInitialState(newProps));
  },

  componentDidMount:function(){

    var self = this;
    var socket = io.connect();
    //listen to tweet event
    socket.on('tweet',function(data){
      //add a tweet
      self.addTweet(data);
    });
    // Attach scroll event to the window for infinity paging
    window.addEventListener('scroll', this.checkWindowScroll);


  },

  //addTweet
  addTweet: function(tweet){
    var updated = this.state.tweets;
    var count = this.state.count +1;
    var skip = this.state.skip +1;
    //add tweet to the beginning of the tweets array
    updated.unshift(tweet);

    //set state
    this.setState({
      tweets:updated,
      count:count,
      skip:skip
    });



  },




  render: function(){

    return (
      <div className="tweets-app">
        <Tweets tweets={this.state.tweets} />
        <Loader paging={this.state.paging}/>
        <NotificationBar count={this.state.count} onShowNewTweets={this.showNewTweets}/>
      </div>
    )

  }
});
