/*
 * the Promise.resolve method returns a Promise object that is resolved with the given value,
 * the value can be a Promise or a thenable object
* */
//Promise.resolve()
//
//example

function getValue(fromCache) {
  if(fromCache) {
    return Promise.resolve('value from cache');
  }
  return new Promise(function(resolve) {
    setTimeout.call(null, function(){ resolve('value from remote');}, 1000);
  });
}

getValue(true).then(function(value) {
  console.log(value);
});

getValue(false).then(function(value) {
  console.log(value);
});

// resolve can be used to init an promise chain
// surpose, you want to fire a remote call to a list of url
// and each call should be called sequencely
// you can use reduce, and pass Promise.resolve() to the init value
var url=['a','b','c'];

var p = url.reduce(function(chain, value) {
  return chain.then(function() {
    return new Promise(function(resolve) {
      setTimeout(function() {
        resolve(value);
      }, 500);
    });
  })
}, Promise.resolve()).then(function(value) {
  console.log('done', value);
});


// same as map, if you want to load them parallelly, you can use map to convert them to promise object
// then use Promise.all to wait them finish

Promise.all(url.map(function(u) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if(u === 'b') {
        reject('b');
      } else {
        resolve(u);
      }
    }, 1000);
  });
})).then(function(value) {
  console.log(value);
}).catch(function(value) {
  console.log(value);
});


// Promise.defer() is same as jquery's $.Defered()

function deferDemo() {
  var dfd = Promise.defer();
  setTimeout(function() {
    dfd.resolve('done')
  }, 1000);
  return dfd.promise;
}

deferDemo().then(function(value) {
  console.log('defer', value);
});
