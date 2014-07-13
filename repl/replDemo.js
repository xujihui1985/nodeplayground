var repl = require('repl'),
    _ = require('underscore'),
    moment = require('moment');

var env = process.env.NODE_ENV || 'dev';

var replServer = repl.start({
    prompt: 'my-app ('+env+') > '
});

replServer.context.moment = moment;
replServer.context.list = _.functions.bind(_);


