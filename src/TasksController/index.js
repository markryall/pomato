"use strict";

var React = require("react");
var {map} = require("lodash");
var store = require("./store");
var Task  = require("../Task");

function state() {
  return {
    tasks       : store.getTasks(),
    currentTick : store.getCurrentTick()
  };
}

module.exports = React.createClass({
  displayName     : "TasksController",
  getInitialState : state,

  update()               { this.setState(state()); },
  componentWillMount()   { store.subscribe(this.update); },
  componentWillUnmount() { store.unsubscribe(this.update); },

  render() {
    var {tasks, currentTick} = this.state;

    if (tasks.length === 0) return null;

    return  <div className="Tasks">
              {map(tasks, Task.mapper.bind(null, currentTick))}
            </div>
  }
});
