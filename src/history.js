var React = require('react');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    var history = {
      tasks: []
    };
    if (window.localStorage['history']) {
      history = JSON.parse(window.localStorage['history']);
    }
    return history;
  },

  componentWillMount: function() {
    var component = this;
    emitter.on('startingTask', function(task) {
      console.log('starting', task);
    });
    emitter.on('stoppingTask', function(task) {
      var tasks = component.state.tasks;
      tasks.push(task);
      component.setState({tasks: tasks});
    });
    emitter.on('finishedTask', function(task) {
      var tasks = component.state.tasks;
      tasks.push(task);
      component.setState({tasks: tasks});
    });
  },

  render: function() {
    window.localStorage['history'] = JSON.stringify(this.state);
    return <p>history</p>;
  }
});
