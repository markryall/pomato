"use strict";

var React            = require("react");
var cx               = require("react/lib/cx");
var {number, string} = React.PropTypes;
var Name             = require("./Name");
var Status           = require("./Status");

function cs(props: any): string {
  return cx({
    "Task"   : true,
    "u-done" : isDone(props)
  });
}

function timeRemaining(props: any): boolean {
  var {endAt, currentTick} = props;
  var tmp = ~~((endAt - currentTick)/1000);
  return tmp >= 0 ? tmp : 0;
}

function isDone(props: any): boolean {
  return timeRemaining(props) === 0;
}

var Task = module.exports = React.createClass({
  displayName : "Task",

  propTypes : {
    name        : string,
    endAt       : number,
    currentTick : number
  },

  render() {
    var {props} = this
    var {name, currentTick, endAt} = props;

    return  <div className={cs(props)}>
              <Name>{name}</Name>
              <Status>{isDone(props) ? "Done" : timeRemaining(props) + "s" }</Status>
            </div>
  },

  statics : {
    mapper(tick: number, d:any, i: number): Task {
      return <Task {...d} currentTick={tick} key={"Task-"+d.uid}/>;
    }
  }
});
