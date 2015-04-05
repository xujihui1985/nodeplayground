var Writable = require('stream').Writable;

function MyWritable() {
  Writable.call(this);
}

MyWritable.prototype = Object.create(Writable.prototype, {
  constructor: MyWritable
});

MyWritable.prototype._write = function(chunk, encoding, callback) {
  process.stdout.write(callback.toString());
  callback();
};

process.stdin.pipe(new MyWritable());
