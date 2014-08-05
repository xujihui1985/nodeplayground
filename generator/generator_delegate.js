function *sub(){
    yield 1;
    yield 2;
}

function *main(){
    yield *sub(); // sub yield
    yield 3;
    yield 4;
}

for(var item of main()) {
    console.log(item);
}
