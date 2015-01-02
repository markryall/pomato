var React = require('react');
var Lcd = require('./Lcd');

module.exports = React.createClass({
  getInitialState: function() {
    return { time: 0 };
  },

  tick: function() {
    this.setState({time: this.state.time - 1});
    if (this.state.time == 0) {
      this.refs.audio.getDOMNode().play();
    } else {
      setTimeout(this.tick, 1000);
    }
  },

  start: function() {
    this.setState({time: 10});
    setTimeout(this.tick, 1000);
  },

  render: function() {
    var number = ("00000" + this.state.time).slice(-5);
    return <div>
      <Lcd number={ number } />
      <div>
        <button value="Start" onClick={ this.start }>Start</button>
      </div>
      <audio ref="audio">
        <source src="http://heroix-development.s3-website-us-east-1.amazonaws.com/boottime.mp3" type="audio/mpeg" />
      </audio>
    </div>;
  }
});
