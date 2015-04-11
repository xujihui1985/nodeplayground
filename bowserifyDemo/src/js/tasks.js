'use strict';

var $ = require('jquery');
var taskData = require('./data/taskData');
var taskRenderer = require('./renderers/taskRenderer');


exports.add = function() {
  console.log('button clicked');
  taskRenderer.renderNew();
};

exports.remove = function(clickEvent) {
  var taskElement = clickEvent.target;
  $(taskElement).closest('.task').remove();
};

exports.clear = function() {
  taskData.clear();
  exports.render();
};


