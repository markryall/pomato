var React = require('react');
var Lcd = require('./Lcd');

module.exports = React.createClass({
  getInitialState: function() {
    return { time: 0 };
  },

  tick: function() {
    this.setState({time: this.state.time + 1});
  },

  componentWillMount: function() {
    setInterval(this.tick, 1000);
  },

  render: function() {
    var number = ("00000" + this.state.time).slice(-5);
    return <div>
      <Lcd number={ number } />
    </div>;
  }
});
