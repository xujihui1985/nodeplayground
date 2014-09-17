var addon = require('./build/Release/addon.node');

var obj = new addon.MyObject(12);
obj.plusOne();
obj.plusOne();

console.log(obj.getValue());