var generators = require('yeoman-generator');
var _ = require('lodash');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('name', {type: String, required: true});
    console.log(this.name);
  },

  writing: function() {
    this.fs.copyTpl(this.templatePath('_controller.js'), this.destinationPath('src/controller/controller.js'));

  }
})
