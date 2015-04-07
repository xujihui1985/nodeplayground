var fs = require('fs');
var https = require('https');


var options = {
  key: fs.readFileSync('./server.pem'),
  cert: fs.readFileSync('./server-cert.pem'),
  ca: fs.readFileSync('./client-cert.pem'),
  requestCert: true
};

https.createServer(options, function(req, res) {
  var authorized = req.socket.authorized ? 'authorized' : 'unauthorized';
  res.writeHead(200);
  res.end('welcome you are ' + authorized + '\n');
}).listen(8000, function() {
  console.log('server started');
});


