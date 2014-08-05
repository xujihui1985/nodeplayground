function *foo(){
    var obj = yield undefined;
    obj.methodnotexists(); //blow up
    console.log('function end') // will not be called
}

var it = foo();

it.next();
try {
    it.next({hello: function(){console.log('world')}});
}
catch(err) {
    console.log(err.message);
}
