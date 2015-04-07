var spawn = require('child_process').spawn;
var EventEmitter = require('events').EventEmitter;
var Writable = require('stream').Writable;
var util = require('util');

var cache = {};

function createStdout(id) {
  var emitStream = cache[id];
  if(!emitStream) {
    emitStream = new EmitStream();
    cache[id] = emitStream;
  }
  return emitStream;
}
function removeStdout(id) {
  if(cache[id]) {
    cache[id] = null;
  }
}

function EmitStream() {
  this.ee = new EventEmitter();
  Writable.call(this);
}
util.inherits(EmitStream, Writable);

EmitStream.prototype._write = function(chunk, encoding, next) {
  this.ee.emit('data', chunk.toString());
  next();
}

EmitStream.prototype.on = function(event, cb) {
  this.ee.on.call(this.ee, event, cb);
};

EmitStream.prototype.emit = function(event, data) {
  this.ee.emit.call(this.ee, event, data);
};

var ls = spawn('ls', ['-la']);
var pwd = spawn('pwd');

var emitter = createStdout('asfadsfasdf');

emitter.on('data', function(data) {
  console.log(data.toString());
});

emitter.emit('data', 'start building.......');

ls.stdout.pipe(emitter);
pwd.stdout.pipe(emitter);

setImmediate(function() {
  emitter.emit('data', 'building finished.......');
});



