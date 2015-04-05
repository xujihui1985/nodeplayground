var cp = require('child_process');
var cpus = require('os').cpus().length;

module.exports = pooler;

function pooler(workMoule) {
  var awaiting = [];
  var readyPool = [];
  var poolSize = 0;

  return function doWork(job, cb) {
    if(!readyPool.length && poolSize > cpus)  {  //if no worker available, queue work to be run later
      return awaiting.push([doWork, job, cb]);
    }
    var child = readyPool.length ? readyPool.unshift() : (poolSize++, cp.fork(workMoule)); // grab next available worker or fork a new process

    var cbTriggered = false;

    child.removeAllListeners()
         .once('error', function(err) {
           if(!cbTriggered) {
             cb(err);
             cbTriggered = true;
           }
           child.kill();
         })
         .once('exit', function() {
           if(!cbTriggered) {
             cb(new Error('Child exit'));
           }
           poolSize--;
           var childIdx = readyPool.indexOf(child);
           if(childIdx > -1) {
             readyPool.splice(childIdx, 1);
           }
         })
         .once('message', function(msg) {
           cb(null, msg);
           cbTriggered = true;
           readyPool.push(child);
           if(awaiting.length) setImmediate.apply(null, awaiting.shift());
         })
         .send(job);
  }
}
