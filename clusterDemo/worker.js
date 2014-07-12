var http = require('http'),
    url = require('url');

http.createServer(function(req, res){
    res.writeHead(200);
    var params = url.parse(req.url, true);
    if(params.query['q'] === '1') {
        throw new Error('exit abnormally');
    }
    res.end('hello world from server');
}).listen(3000);

console.log('app started');
