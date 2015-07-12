'use strict';

var _ = require('lodash');
var fs = require('fs');
var co = require('co');
var Rx = require('rx');
var parseJSON = JSON.parse;
var log = function(a) {
  console.log(a);
  return a;
}

var fork = _.curry(function(f, promise) { return promise.then(f, log); })

var flatMap = _.curry(function(f, functor) {
  return functor.flatMap ? functor.flatMap(f) : functor.map(f);
});


var getFile = function(fileName) {
  return fs.readFileSync(fileName);
};

Promise.prototype.map = function _map(f) {
  return this.chain(function(a){ return Promise.resolve(f(a)) })
}

Promise.prototype.chain = function _chain(f) {
  return new Promise(function(resolve, reject) {
                      return this.then(function(a){
                                          return f(a).then(resolve, reject); }
                                      , function(b){
                                          return reject(b);})
                    }.bind(this));
}

var getFileAsync = function(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, function(err, content) {
      resolve(content.toString());
    });
  });
}

var getProp = _.curry(function(prop, obj) {
  return obj[prop];
});

var parser = _.compose(flatMap(_.compose(getProp('version'), parseJSON)), getFileAsync);

var getPackageVersion = _.compose(fork(function(result) {
  console.log(result);
}), parser);

getPackageVersion('./package.json');


//var getPackageName = _.compose(getProp('name'), parseJSON, getFile);

//console.log(getPackageName('./package.json'));

//var getJSON = _.compose(parseJSON, getFile);

//getJSON('./package.json');


//console.log(Promise.resolve(getFile('./package.json')));

