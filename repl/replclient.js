var net = require('net');

var socket = net.connect(1337);

process.stdin.setRawMode(true); 
//set stdin as a raw tty input stream This allows, 
//for example, the Tab key and Up Arrow key to behave as you’d expect 
//in a modern terminal session.

process.stdin.pipe(socket);
socket.pipe(process.stdout);

socket.once('close', function() {
  process.stdin.destroy();
});
//When the connection is terminated, destroy the stdin stream, 
//allowing the process to exit.  
