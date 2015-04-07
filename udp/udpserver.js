var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('message', function(msg, rinfo) {
  console.log(msg.toString('utf-8'));
});

server.on('listening', function() {
  var address = server.address();
  console.log('server listening', address.address, address.port);
});

server.bind(41234);
