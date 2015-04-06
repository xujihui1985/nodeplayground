var repl = require('repl');
var net = require('net');

net.createServer(function(socket) {

  var r = repl.start({
    input: socket,
    output: socket,
    terminal: true
  });

  r.on('exit', function() {
    socket.end();
  });
}).listen(1337);

console.log('repl server started');
