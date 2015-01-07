"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName : "Task/Status",

  render() {
    var {children} = this.props;

    return  <div className="TaskStatus">
              {children}
            </div>
  }
});

