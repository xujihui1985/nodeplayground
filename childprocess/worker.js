process.on('message', function(msg) {
  process.send('done');
});
