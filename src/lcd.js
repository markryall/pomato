var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
  render: function() {
    var fromDigit = function(digit) {
      var className = "lcd n" + digit;
      return <div className={ className } />;
    }

    return <div>
      { _.map(this.props.number, fromDigit) }
    </div>;
  }
});
