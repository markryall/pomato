var React = require('react');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    var task = {
      name: 'change world',
      duration: '1500'
    };
    if (window.localStorage['task']) {
      task = JSON.parse(window.localStorage['task']);
    }
    return task;
  },

  changed: function(event) {
    var state = this.state;
    state[event.target.id] = event.target.value;
    window.localStorage['task'] = JSON.stringify(state);
    this.setState(state);
  },

  start: function() {
    emitter.emit('startingTask', {
      name: this.state.name,
      duration: Number(this.state.duration)
    });
  },

  render: function() {
    return <div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" value={ this.state.name } onChange={ this.changed } />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input id="duration" value={ this.state.duration } onChange={ this.changed } />
        </div>
        <button value="Start" onClick={ this.start }>Start</button>
      </div>;
  }
});
