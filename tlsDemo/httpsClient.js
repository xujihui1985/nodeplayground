var fs = require('fs');
var https = require('https');
var os = require('os');

var options = {
  key: fs.readFileSync('./client.pem'),
  cert: fs.readFileSync('./client-cert.pem'),
  ca: fs.readFileSync('./server-cert.pem'),
  port: 8000,
  hostname: os.hostname(),
  path: '/'
};

https.get(options, function(res) {
  res.on('data', function(data) {
    console.log(data.toString());
  });
}).on('error', function(err) {
  console.log(err);
});

