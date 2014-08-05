var request = require('./request2');

function asyncRequest(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(err, data) {
            if(err) reject(err);
            else resolve(data);
        });
    });
}

function runGenerator(g) {
    var it = g(), 
        ret;

    (function iterator(val) {
        //kickoff the first yield
        ret = it.next(val);
        if(!ret.done) {
            //detect thet ret.value is a promise object
            if (ret.value instanceof Promise) {
                //if the ret.value is promise, pass the resolved value to iterator to kickoff next "next"
                ret.value.then(iterator, function(err){
                    //throw the error if there is something wrong
                    //strange the error didn't blow up if I haven't catch the yield ?
                    it.throw(err);
                });
            }
            else {
                setImmediate(function(){
                    iterator(ret.value);
                });
            }
        }
    })();
}

runGenerator(function *main() {
    try {
        var result = yield asyncRequest('dummyurl');
    }
    catch(err) {
        console.log(err.message);
        console.log(err.stack);
        return;
    }
    console.log(result);
    try{
        var result2 = yield asyncRequest('dummyurl2');
    }
    catch(err) {
        console.log(err.message);
        return;
    }
    console.log(result2);
    try {
        var result3 = yield Promise.all([
            asyncRequest('dummyurl'),
            asyncRequest('dummyurl2')
        ]);
    }
    catch (err) {
        console.log(err.message);
        return;
    }
    console.log(result3);
});

