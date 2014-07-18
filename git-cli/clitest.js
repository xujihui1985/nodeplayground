#!/usr/bin/env node

var program = require('commander'),
    clc = require('cli-color'),
    multiline = require('multiline'),
    package = require('./package');

program
    .description(package.description)
    .version(clc.cyan(package.version))
    .option('-c, --create', 'create new reposition');

program.on('--help',function(){
    var examples = multiline(function(){/*
        Examples:

        gitclient -c "new repo name" "repo description"
    */});
    console.log(examples);
});

program.parse(process.argv);

console.log(program);
