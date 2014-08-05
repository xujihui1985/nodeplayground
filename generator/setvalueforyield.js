var assert = require('./assert');

function *foo(args){
    var x = yield (args + 1);
    console.log('continue from first yield');
    var y = yield (x/2);
    yield x+y;
    console.log('have been done');
}

var it = foo(5);
assert(it.next().value===6, 'not correct');
assert(it.next(10).value === 5, 'not correct');
assert(it.next(10).value === 20, 'not correct');
assert(it.next().done === true, 'not correct');

