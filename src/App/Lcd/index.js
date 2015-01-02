var React = require('react');

module.exports = React.createClass({
  render: function() {
    var className = "lcd n" + this.props.number;
    return <div className={ className } />;
  }
});
