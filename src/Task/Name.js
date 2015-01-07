"use strict";

var React = require("react");

module.exports = React.createClass({
  displayName : "Task/Name",

  render() {
    var {children} = this.props;

    return  <div className="TaskName">
              {children}
            </div>
  }
});
