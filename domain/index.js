var domainCreator = require('domain').create;
var http = require('http');

http.createServer(function(req,res){
    var d = domainCreator();

    d.on('error', function(err){
        console.log(err.message);
        res.end(err.message);
        d.dispose();
    });

    //because req and res were created before this domain created
    //so we need to explictitly add them into the domain
    //so if the emitter emits an error event, it will routed to the domain's
    //error event
    d.add(req);
    d.add(res);

    d.run(function(){
        // a.b will trigger an exception that will be catched by domain's 
        // error event
        a.b();
        res.end('hello world');
    });
}).listen(3000);
