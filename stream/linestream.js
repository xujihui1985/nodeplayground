var stream = require('stream');
var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');

var ls = spawn('ls', ['-la'], {
  cwd: __dirname
});


function LineStream(options) {
  options = options || {};
  //options.decodeStrings = false;
  options.highWaterMark = 1;
  this.arr = [];
  this.lastRemained = '';
  stream.Writable.call(this, options);
}

LineStream.prototype = Object.create(stream.Writable.prototype, {
  constructor: { value: LineStream }
});

LineStream.prototype._write = function(chunk, encoding, callback) {
  var c,
      match;

  c = this.lastRemained + chunk.toString();
  while(/\r?\n|\r/.test(c)) {
    match = /\r?\n|\r/.exec(c);
    this.arr.push(c.slice(0, match.index+1));
    c = c.slice(match.index+1); //add \n into count otherwise \n will still on the remain content
  }
  if(c) {
    this.lastRemained = c;
    console.log('lastRemained', this.lastRemained);
  }
  callback();
  console.log(this.arr);
};

LineStream.prototype.toString = function() {
  return this.arr.map(function(line) {
    return line.trim();
  }).join('|');
}

var s = new LineStream();
s.write('asdff\n');
s.write('asdff');
s.write('aaaaaa\nbbbbbb');
s.write('dff\n');
s.end();
console.log(s.toString());
//fs.createReadStream('/Users/sean/work/nodeinpractice/part2.md').pipe(new LineStream());
