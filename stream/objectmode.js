var stream = require('stream');

function MemoryStream(options) {
  options = options || {};
  options.objectMode = true;
  stream.Readable.call(this, options);
}

MemoryStream.prototype = Object.create(stream.Readable.prototype, {
  constructor: { value: MemoryStream }
});

MemoryStream.prototype._read = function() {
  //setTimeout(function() {
    this.push(process.memoryUsage());
  //}.bind(this), 500);
};


var m = new MemoryStream();
m.on('readable', function() {
  var output = m.read();
  console.log('readable %j', output);
});

//m.on('data', function(data) {
  //console.log(data);
//});
