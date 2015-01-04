var React = require('react');
var Player = require('./player');
var TaskForm = require('./taskForm');
var TaskTimer = require('./taskTimer');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      running: false
    };
  },

  componentWillMount: function() {
    var component = this;
    emitter.on('startingTask', function(task) {
      component.setState({ running: true, task: task });
    });
    emitter.on('stoppingTask', function() {
      component.setState({ running: false });
    })
  },

  render: function() {
    var component = <TaskForm />;

    if (this.state.running) {
      component = <TaskTimer task={ this.state.task } />;
    }

    return <div>
      { component }
      <Player />
    </div>;
  }
});
