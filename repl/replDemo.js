var repl = require('repl'),
    moment = require('moment');

var env = process.env.NODE_ENV || 'dev';

var replServer = repl.start({
    prompt: 'my-app ('+env+') > '
});

replServer.context.moment = moment;


