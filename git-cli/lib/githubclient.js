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
        this.headers['Authorization'] = 'Basic '+ (new Buffer(this.username+':'+this.password).toString('base64'));
        return this;
    },

    createRepo: function(repo, callback){
        var options = repo.create();
        options.headers = this.headers;
        request(options, function(err, response, body){
            if(err) {
                return callback(err, null);
            }
            repo.properties = body;
            callback(null, repo);
        });
    }
}
module.exports = GithubClient;
