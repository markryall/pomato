"use strict";

var NS         = "NEW_TASK_FORM";
var Dispatcher = require("oro-dispatcher");
var {assign}   = require("lodash");

function send(actionType: string, data: any) {
  Dispatcher.handleViewAction(assign(data||{}, {
    actionType : actionType
  }));
}

module.exports = {
  updateName(name) {
    send("NEW_TASK_FORM_UPDATE_NAME", {name});
  },

  updateDuration(duration) {
    send("NEW_TASK_FORM_UPDATE_DURATION", {duration});
  },

  submit(name, duration) {
    send("NEW_TASK_FORM_SUBMIT", {name, duration});
  }
};
