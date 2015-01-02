var React = require('react');
var Lcd = require('./lcd');
var Player = require('./player');
var TaskForm = require('./taskForm');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      time: 0,
      name: 'change world',
      duration: '1500',
      running: false
    };
  },

  tick: function() {
    this.setState({time: this.state.time - 1});
    if (this.state.time == 0) {
      emitter.emit('play');
    } else {
      setTimeout(this.tick, 1000);
    }
  },

  componentWillMount: function() {
    var component = this;
    emitter.on('start', function(task) {
      console.log(task);
      component.setState({time: Number(task.duration)});
      setTimeout(component.tick, 1000);
    })
  },

  render: function() {
    var number = ("00000" + this.state.time).slice(-5);
    var name = this.state.name;
    return <div>
      <TaskForm />
      <Lcd number={ number } />
      <Player />
    </div>;
  }
});
