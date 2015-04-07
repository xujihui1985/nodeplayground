var makepool = require('./pooler');
var runJob = makepool('./worker');

runJob('hello', function(err, data) {
  console.log(data);
});

