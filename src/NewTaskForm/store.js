"use strict";

var NS             = "NEW_TASK_FORM";
var {assign}       = require("lodash");
var {EventEmitter} = require("events");
var Dispatcher     = require("oro-dispatcher");

var __Name, __Duration;

function reset() {
  __Name     = "Change World";
  __Duration = 900000;
};

reset();

var store = module.exports = assign({}, EventEmitter.prototype, {
  broadcast()     { this.emit(NS); },
  subscribe(fn)   { this.on(NS,fn); },
  unsubscribe(fn) { this.removeListener(NS,fn); },

  getName()     { return __Name; },
  getDuration() { return __Duration; },

  dispatcherToken : Dispatcher.register(function(payload) {
    var {actionType, name, duration} = payload.action;

    switch (actionType) {
      case "NEW_TASK_FORM_UPDATE_NAME":
        __Name = name;
        store.broadcast();
        break;

      case "NEW_TASK_FORM_UPDATE_DURATION":
        __Duration = duration;
        store.broadcast();
        break;

      case "NEW_TASK_FORM_SUBMIT":
        reset();
        store.broadcast();
        break;
    }
  })
});
