var React = require('react');
var emitter = require('./emitter');

module.exports = React.createClass({
  componentWillMount: function() {
    var component = this;
    emitter.on('finishedTask', function() {
      component.refs.audio.getDOMNode().play();
    })
  },

  render: function() {
    return <audio ref="audio">
        <source src="http://heroix-development.s3-website-us-east-1.amazonaws.com/boottime.mp3" type="audio/mpeg" />
      </audio>;
  }
});
