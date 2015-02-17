// Promise.race method returns a promise that resolves or rejects as soon as one of the 
// promises in the iterable resolves or rejects

var p1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('done');
  }, 1000);
});
var timeout = new Promise(function(resolve ,reject) {
  setTimeout(function() {
    reject(new Error('timeout'));
  },500);
})
Promise.race([
  p1,timeout
]).then(function() {
  console.log('success');
}).catch(function(err) {
  console.log(err);
  console.log(err instanceof Error);
});
