#!/usr/bin/env node

var program = require('commander'),
    clc = require('cli-color'),
    package = require('./package');

program
    .description(package.description)
    .version(clc.cyan(package.version))
    .option('-c, --create', 'create new reposition');

program.on('--help',function(){
    console.log([
        '  Examples:',
        '',
        '  gitclient -c "new repo name" "repo description"'
    ].join('\n'));
});

program.parse(process.argv);

console.log(program);
