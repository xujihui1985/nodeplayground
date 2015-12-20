var net = require('net');
var path = require('path');

var client = net.connect(path.join(__dirname, 'socket'));
client.write('hello\n');

client.on('data', function(data) {
  console.log(data.toString());
});
