var request = require('./request');

/*
request('dummyurl', function(data){
    console.log(data);
});
*/

function asyncRequest(url) {
    request(url, function(data){
        it.next(data);
    });
}

function *main() {
    var result = yield asyncRequest('dummyurl');
    console.log(result);
}

var it = main();
it.next(); //kick off the first yield
