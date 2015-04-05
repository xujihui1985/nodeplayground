stream = require('stream');
var fs = require('fs');
var util = require('util');

function JSONLineReader(source) {
  stream.Readable.call(this);
  this._source = source;
  this._foundLineEnd = false;
  this._buffer = '';
}

JSONLineReader.prototype = Object.create(stream.Readable.prototype, {
  constructor: JSONLineReader,
  readable: function() {
    return this.source.readable;
  }
});

//JSONLineReader.prototype.__defineGetter__('readable', function() {
//});

JSONLineReader.prototype.resume = function() {
  this._source.on('readable', function() {
    stream.Readable.prototype.resume.call(this);
  }.bind(this));
};

JSONLineReader.prototype._read = function(size) {
 // console.log('_read called', size);
  var chunk;
  var line;
  var lineIndex;
  var result;

  if(this._buffer.length === 0) {
    chunk = this._source.read();
    this._buffer += chunk;
  }

  lineIndex = this._buffer.indexOf('\n');
  
  if(lineIndex !== -1) {
    line = this._buffer.slice(0, lineIndex);
    if(line) {
      result = JSON.parse(line);
      this._buffer = this._buffer.slice(lineIndex+1);
//      this.emit('object', result);
//      console.log('result string',result.toString());
      this.push(util.inspect(result));
    } else {
      this._buffer = this.buffer.slice(1);
      this.push(null);
    }
  }
}

function StringStream(str) {
  stream.Readable.call(this);
  this.encoding = 'utf8';
  this._str = str;
}

util.inherits(StringStream, stream.Readable);

StringStream.prototype._read = function() {
  this.push(this._str);
  this.push(null);
}


//var jsonReader = new JSONLineReader(fs.createReadStream('./sample.json'));
//jsonReader.pipe(process.stdout);

var strJsonReader = new JSONLineReader(new StringStream('{"name": "sean"}\n{"name":"anna"}\n'));
strJsonReader.pipe(process.stdout);
//jsonReader.on('object', function(data) {
  //console.log(data);
//});
