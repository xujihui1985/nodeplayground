var tls = require('tls');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./server.pem'),
  cert: fs.readFileSync('./server-cert.pem'),
  ca: fs.readFileSync('./client-cert.pem'),
  requestCert: true
};

var server = tls.createServer(options, function(socket) {
  console.log(socket.authorized ? 'authorized': 'not authorized');
  socket.setEncoding('utf8');
  socket.on('connect', function() {
    console.log('client connected');
  });
  socket.write('welcome\n');
  socket.on('end', function() {
    console.log('client closed');
  });
  socket.on('data', function(data) {
    socket.write('welcome ' + data);
  });
//  socket.pipe(socket);
});

server.listen(8000, function() {
  console.log('server started');
});
