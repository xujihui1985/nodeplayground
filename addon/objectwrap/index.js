var addon = require('./build/Release/addon.node');

var AnotherObject = addon.MyObject;

addon = null;
global.gc();

setTimeout(function() {
  var obj = new AnotherObject(12);
  console.log(obj.getValue());
}, 4000);
