function *foo() {
    try{
        var x = yield 2;
        console.log('x: '+x);
    }
    catch (err) {
        console.log(err.message); // error occured
    }
    console.log('function end');
}

var it = foo();
it.next();
it.throw(new Error('error occured'));


