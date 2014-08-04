var domain = require('domain'),
    fs = require('fs');

var d = domain.create();
var filename = process.argv[2];
//intercept will catch the error that thrown in the call back
fs.readFile(filename, 'utf-8', d.intercept(function(chunk){
    console.log(chunk);
}));

d.on('error',function(err){
    console.log('catch by domain');
    console.log(err.message);
});
