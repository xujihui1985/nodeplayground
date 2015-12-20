'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

var MyBase = generators.Base.extend({
  anotherHelper: function() {
    this.log('inside another helper');
  }
});

module.exports = MyBase.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    //arguments yo plugin xxx 
    this.argument('name', {type: String, required: true});
    this.log('name', this.name);

    this.option('includeutils', {
      desc: 'Optionally include ',
      type: Boolean,
      default: false
    })

    //this.argument('appname', {type:String ,required: true});
  },

  init: function() {
    this.log('inside init');
  },

  _foo: function() {
    this.log('foo');
  },

  method1: function() {
    this.log('hello world');
    this.anotherHelper();
  },

  initializing: function() {
    this.log('initializing');
  },

  prompting: {
    method1: function(){
      this.log(yosay('welcome to '+chalk.yellow('(HELLO)')));
    },
  
    method2: function(){
      var done = this.async();
      this.prompt([{    //inquire
        type: 'input',
        name: 'ngappname',
        message: 'Augular App name',
        default: 'app',
        store: true
      }, {
        type: 'checkbox',
        name: 'jslibs',
        message: 'which js library you like to include',
        choices: [
          {
            name: 'lodash',
            value: 'lodash',
            checked: true
          },
          {
            name: 'Moment',
            value: 'moment.js',
            checked: false
          },
        ]
      }], (anwsers)=> {
        this.config.set('jslibs', anwsers.jslibs);
        this.config.save();
        this.ngappname = anwsers.ngappname;
        done();
      })
    }
  },

  configuring: function() {
    this.log('configuring');
  },

  default: function() {
    this.log('default');
  },

  writing: {
    gulpfile: function() {
      this.log('Template path: ', this.templatePath());
      this.log('Dest path: ', this.destinationPath());
      const source = this.templatePath('_gulpFile.js');
      const dest = this.destinationPath('src/gulpfile.js');
      this.log('source', source);
      this.log('dest', dest);

      this.copy('_gulpFile.js', 'src/gulpfile.js');

      this.directory('styles', 'src/styles');
    },
    html: function() {
      this.fs.copyTpl(this.templatePath('_index.html'), this.destinationPath('src/index.html'), {
        appname: 'My cool app',
        ngapp: 'myapp'
      });
    },

    common: function() {
      this.composeWith('common', {
        options: {
          gitignore: true,
          gitattributes: true,
          editorconfig: true
        }
      }, {
        local: require.resolve('generator-common')
      });
    
    },

    bower: function() {
      var bowerJSON = {
        name: this.ngappname,
        dependencies: {}
      };
      bowerJSON.dependencies.angular = '~1.4.6';
      bowerJSON.dependencies.lodash = '~3.10.1';
      if(this.options.includeutils) {
        bowerJSON.dependencies.angularutil = '0.0.0';
      }
      console.log(this.config.get('jslibs'));
      this.fs.writeJSON('bower.json', bowerJSON);
    }
  
  },

  conflicts: function() {
    this.log('conflicts');
  },

  install: function() {
    this.log('install');
    this.bowerInstall();
  },

  end: function() {
    this.log('end');
  }

});
