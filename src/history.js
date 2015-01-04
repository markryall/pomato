var React = require('react');
var emitter = require('./emitter');

module.exports = React.createClass({
  componentWillMount: function() {
    var component = this;
    emitter.on('startingTask', function(task) {
      console.log('starting', task);
    });
    emitter.on('stoppingTask', function(task) {
      console.log('stopping', task);
    });
    emitter.on('finishedTask', function(task) {
      console.log('finished', task);
    });
  },

  render: function() {
    return <p>history</p>;
  }
});
