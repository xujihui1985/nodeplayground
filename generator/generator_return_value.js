function *sub(){
    var result = yield 2;
    return function(){
        console.log('function return from sub');
    }
}

function *main(){
    var func = yield *sub(); // sub yield
    func();
    yield 3;
    yield 4;
}

var it = main();
it.next(); // vaule:2
console.log(it.next().value); //value:3 also func() will be called
console.log(it.next().value); //value:4
console.log(it.next().done); //true


