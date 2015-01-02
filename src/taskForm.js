var React = require('react');
var emitter = require('./emitter');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      name: 'change world',
      duration: '1500'
    };
  },

  changed: function(event) {
    var state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  },

  start: function() {
    emitter.emit('start', this.state);
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
