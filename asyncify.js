//var async = require('async');

function asyncify(fn) {
  var origin = fn;
  console.log(origin.toString());
}

function doSth(para, callback) {
  setImmediate(function() {
    callback(para);
  });
}

asyncify(doSth);