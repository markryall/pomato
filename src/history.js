var React = require('react');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    var history = {
      tasks: {}
    };
    if (window.localStorage['history']) {
      history = JSON.parse(window.localStorage['history']);
    }
    return history;
  },

  appendTask: function(data, completed) {
    var tasks = this.state.tasks;
    if (!tasks[data.task.name]) {
      tasks[data.task.name] = { started: 0, completed: 0, time: 0 }
    }
    tasks[data.task.name]['started'] += 1
    if (completed) {
      tasks[data.task.name]['completed'] += 1
    }
    tasks[data.task.name]['time'] += data.time
    this.setState({tasks: tasks});
  },

  componentWillMount: function() {
    var component = this;
    emitter.on('startingTask', function(task) {
      console.log('starting', task);
    });
    emitter.on('stoppingTask', function(data) {
      component.appendTask(data, false);
    });
    emitter.on('finishedTask', function(data) {
      component.appendTask(data, true);
    });
  },

  render: function() {
    window.localStorage['history'] = JSON.stringify(this.state);
    return <p>history</p>;
  }
});
