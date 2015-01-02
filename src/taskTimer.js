var React = require('react');
var Lcd = require('./lcd');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      time: Number(this.props.task.duration),
      stopped: false,
      timer: setTimeout(this.tick, 1000)
    };
  },

  tick: function() {
    if (this.state.stopped) {
      return;
    }
    this.setState({time: this.state.time - 1});
    if (this.state.time == 0) {
      emitter.emit('play');
    } else {
      setTimeout(this.tick, 1000);
    }
  },

  stop: function() {
    this.setState({stopped: true});
    clearTimeout(this.state.timer);
    emitter.emit('stop');
  },

  render: function() {
    return <div>
      <div>Now: { this.props.task.name }</div>
      <Lcd number={ ("00000" + this.state.time).slice(-5) } />
      <button value="Stop" onClick={ this.stop }>Stop</button>
    </div>;
  }
});
