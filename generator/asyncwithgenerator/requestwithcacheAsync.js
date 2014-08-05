var request = require('./request');

var cache = {};
function asyncRequest(url) {
/*
 * a subtle , tricky detail here is the need for the settimeout, deferral in the case where the cache has
 * the result already. if we had jsut called it.next(..) right away, it would have created an error
 * ,because (and this is the tricky part) the generator is not technically in a paused state yet. Out function
 * call request(..) is being fully evaluated first, and then the yield paused. so we can't call it.next(..) again
 * yet immediately inside request(..), because at that exact moment the generator is still running (yield hasn't been processed).
 * but we can call it.next(..) "later", immediately after the current thread of execution is complete
 * */
    if(cache[url]) {
        setImmediate(function() {
            it.next(cache[url]);
        });
    }
    else {
        request(url, function(data){
            cache[url]=data;
            it.next(data);
        });
    }
}

function *main() {
    var result = yield asyncRequest('dummyurl');
    console.log(result);
    console.log('--------------request cache data---------------');
    var localresult = yield asyncRequest('dummyurl');
    console.log(localresult);
}

var it = main();
it.next();
