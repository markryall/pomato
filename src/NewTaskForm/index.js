"use strict";

var React                                = require("react");
var store                                = require("./store");
var {updateName, updateDuration, submit} = require("./actions");

function state(): any {
  return {
    name     : store.getName(),
    duration : store.getDuration()
  };
}

module.exports = React.createClass({
  displayName     : "NewTaskForm",
  getInitialState : state,

  update()               { this.setState(state()); },
  componentWillMount()   { store.subscribe(this.update); },
  componentWillUnmount() { store.unsubscribe(this.update); },

  render() {
    var {name, duration} = this.state;

    return  <form onSubmit={this.submit} className="TaskForm">
              <input onChange={this.updateName} value={name} placeholder="Name"/>
              <input onChange={this.updateDuration} value={duration} placeholder="ms"/>
              <button onClick={this.submit}>+</button>
            </form>
  },

  updateName(e)     { updateName(e.target.value); },
  updateDuration(e) { updateDuration(e.target.value); },
  submit(e) {
    e.preventDefault();
    var {name, duration} = this.state;
    submit(name, duration);
  }
});
