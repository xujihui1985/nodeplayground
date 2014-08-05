function *foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
}

for(var item of foo()){
    console.log(item);
}
