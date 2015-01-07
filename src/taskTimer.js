var React = require('react');
var Lcd = require('./lcd');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      time: this.props.task.duration,
      timer: setTimeout(this.tick, 1000)
    };
  },

  tick: function() {
    this.setState({time: this.state.time - 1});
    if (this.state.time == 0) {
      emitter.emit('finishTimer', {
        task: this.props.task,
        time: this.props.task.duration
      });
    } else {
      setTimeout(this.tick, 1000);
    }
  },

  stop: function(reason) {
    clearTimeout(this.state.timer);
    emitter.emit('stopTimer', {
      task: this.props.task,
      reason: reason,
      time: (this.props.task.duration - this.state.time)
    });
  },

  render: function() {
    return <div>
      <div>Now: { this.props.task.name }</div>
      <Lcd number={ ("00000" + this.state.time).slice(-5) } />
      <button onClick={ this.stop.bind(this, 'interrupted') }>Interrupted</button>
      <button onClick={ this.stop.bind(this, 'completed') }>Completed</button>
    </div>;
  }
});
