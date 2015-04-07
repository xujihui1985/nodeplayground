var request = require('request'),
    fs = require('fs'),
    zlib = require('zlib'),
    s = request('http://taobao.com');
s
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('taobal.html.gz'));

var a = 'asdf';

var func = function() {
  var a = 1,
      b = 2,
      c = 3;
};

function hello () {
  var a = '';

}
