"use strict";

var NS               = "TASKS";
var {assign, sortBy} = require("lodash");
var {EventEmitter}   = require("events");
var Dispatcher       = require("oro-dispatcher");

var __Tasks = {};

(function() {
  if (window && window.localStorage && window.localStorage["pomato-tasks"]) {
    __Tasks = JSON.parse(window.localStorage["pomato-tasks"]);
  }
})();

var store = module.exports = assign({}, EventEmitter.prototype, {
  broadcast()     { this.emit(NS); },
  subscribe(fn)   { this.on(NS,fn); },
  unsubscribe(fn) { this.removeListener(NS,fn); },

  getTasks()       { return sortBy(__Tasks, "createdAt").reverse(); },
  getCurrentTick() { return +new Date(); },

  dispatcherToken : Dispatcher.register(function(payload) {
    var {actionType, name, duration, uid, data} = payload.action;

    switch (actionType) {
      case "NEW_TASK_FORM_SUBMIT":
        newTask({name, duration});
        store.broadcast();
        break;
    }
  })
});

function newTask(task: any): any {
  var uid  = genUID();
  var tick = +new Date();

  __Tasks[uid] = assign(task, {
    uid       : uid,
    createdAt : tick,
    endAt     : tick + parseInt(task.duration, 10)
  });

  if (window && window.localStorage) {
    window.localStorage["pomato-tasks"] = JSON.stringify(__Tasks);
  }

  return __Tasks[uid];
}

function genUID(): string {
  return (+new Date() + ~~(Math.random() * 999999)).toString(36);
}

setInterval(function() {
  store.broadcast();
}, 1000);
