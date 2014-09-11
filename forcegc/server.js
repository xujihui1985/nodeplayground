var http = require('http'),
    util = require('util');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');

  setTimeout(function() {
    global.gc();
    console.log('gc happened');
  }, 2000);
  setTimeout(function() {
    console.log('Memory Usage:');
    console.log(util.inspect(process.memoryUsage()));
  }, 5000);

}).listen(3000);

console.log('Server running at port 3000');