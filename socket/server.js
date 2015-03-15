var net = require('net');
var path = require('path');
var fs = require('fs');


var server = net.createServer(function(c) {
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.on('data', function(data) {
    console.log(data.toString());
  });
  c.on('connection', function() {
    console.log('connected');
  });
  c.write('hello \n');
});


fs.unlink(path.join(__dirname, 'socket'), function() {
  server.listen(path.join(__dirname, 'socket'), function() {
    console.log('listening...');
  });
});

