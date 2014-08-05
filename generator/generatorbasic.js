function *foo(){
    yield "hello";
    yield "world";
    console.log('done');
}

var iterator = foo();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
