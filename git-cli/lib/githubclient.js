var request = require('request'),
    Repo = require('./repo');

function GithubClient(username, password) {
    this.username = username;
    this.password = password;
    this.headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'xujihui1985',
        'Content-type': 'application/json'
    };
}

GithubClient.prototype = {
    constructor: GithubClient,

    login: function(){
        this.headers['Authorization'] = 'Basic '+ (new Buffer(username+':'+password).toString('base64'));
    },

    createRepo: function(properties, callback){
        var repo = new Repo(properties);
        repo.headers = this.headers;
        request(repo, function(err, response, body){
            if(err) {
                return callback(err, null);
            }
            callback(null, body);
        });
    }
}

module.exports = GithubClient;
