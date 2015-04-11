'use strict';

var $ = require('jquery');
var tasks = require('./tasks');

function _addTask(e) {
  tasks.add();
}

function _registerEventHandlers() {
  $('#new-task-button').on('click', _addTask);
}

_registerEventHandlers();
