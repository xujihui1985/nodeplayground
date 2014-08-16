function delay(done) {
    setTimeout(function(){
        done(null, 'delay done');
    },1000);
}

var fs = require('fs');
var stat = function(filename) {
    return function (done) {
        fs.stat(filename, done)
    };
};

function *genFn() {
    console.log('before delay');
    console.log(yield stat('./generatortest.js'));
    console.log(yield delay);
    console.log('after delay');
}

var gen = genFn();
next();

function next (err, res) {
    var ret = gen.next(res);
    if (!ret.done) {
        ret.value(next);
    }
}
