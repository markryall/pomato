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

  updateHistory: function(name, key, time) {
    var tasks = this.state.tasks;
    if (!tasks[name]) {
      tasks[name] = {}
    }
    if (!tasks[name][key]) {
      tasks[name][key] = 0;
    }
    tasks[name][key] += 1;
    tasks[name]['time'] += time;
    this.setState({tasks: tasks});
  },

  componentWillMount: function() {
    var component = this;
    emitter.on('startTimer', function(task) {
      component.updateHistory(task.name, 'started', 0);
    });
    emitter.on('stopTimer', function(data) {
      component.updateHistory(data.task.name, data.reason, data.time);
    });
    emitter.on('finishTimer', function(data) {
      component.updateHistory(data.task.name, 'finished', data.time);
    });
  },

  render: function() {
    window.localStorage['history'] = JSON.stringify(this.state);
    return <p>history</p>;
  }
});
