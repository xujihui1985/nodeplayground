//var cache=3;

var url=['a','b','c'];

url.map(function(u) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if(u === 'd') {
        reject('b');
      } else {
        resolve(u);
      }
    }, 1000);
  });
}).reduce(function(chain, value) {
  return chain.then(function() {
    return value;
  });
}, Promise.resolve()).then(function(value) {
  console.log('success', value);
}).catch(function(v) {
  console.log('failed', v);
});

/*var p = url.reduce(function(chain, value) {
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
});*/


//function delay() {
  //if(cache) return cache;
  //return new Promise(function(resolve) {
    //setTimeout(function() {
      //cache=3;
      //resolve(3);
    //}, 1000);
  //});
//}

//Promise.resolve(delay()).then(function(value) {
  //console.log(value);
//});
