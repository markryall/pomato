"use strict";

var React    = require("react");
var Tasks    = require("../TasksController");
var TaskForm = require("../NewTaskForm");

module.exports = React.createClass({
  displayName : "App",

  render() {
    return  <div className="App">
              <TaskForm/>
              <Tasks/>
            </div>
  }
});
