var clc = require('cli-color');

function Repo(properties) {
    this.properties = properties;
}

Repo.prototype = {
    constructor: Repo,

    create: function(){
        return {
            url: 'https://api.github.com/user/repos',
            method: 'post',
            json: this.properties
        }
    },

    helpInfo: function(){
        return [
            '',
            'push an existing repository from the command line',
            '',
            'git remote add origin '+clc.green(this.properties.clone_url),
            'git push -u origin master'
        ].join('\n');
    }

}

module.exports = Repo;
