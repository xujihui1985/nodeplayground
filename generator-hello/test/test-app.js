'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('hello:app', function(){

  describe('default', function() {

    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
            .withArguments(['helloapp'])
            .withOptions({includeutils: true})
            .on('end', done);
    });

    it('create files', function(){
      assert.file([
        'src/gulpfile.js'
      ]);
    
    });

    it('adds default app', function() {
      assert.fileContent('src/gulpfile.js', /console/);
    });
  
  });

  describe('hello prompt', function() {
    before(function(done) {
      helpers.run(path.join(__dirname, '../app'))
            .withArguments(['hhhh'])
            .withOptions({includeutils: true})
            .withPrompts({ngappname: 'hellllllll'})
            .on('end', done);
    });

    it('injects custom ngappname', function() {
      console.log(assert);
      console.log(helpers);
    
    });
  
  });

});
