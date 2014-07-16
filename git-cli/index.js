var GithubClient = require('./lib/githubclient.js'),
    args = process.argv.slice(2);

var options = {
    //url: 'https://api.github.com/user/repos',
    url: 'https://api.github.com/repos/xujihui1985/nodeplayground',
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'xujihui1985',
        'Content-type': 'application/json',
        'Authorization': 'Basic '+(new Buffer('xujihui1985:C8i0s4c8o6').toString('base64'))
    }
};

var updateOptions = {
    url: 'https://api.github.com/repos/xujihui1985/nodeplayground',
    method: 'patch',
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'xujihui1985',
        'Content-type': 'application/json',
        'Authorization': 'Basic '+(new Buffer('xujihui1985:C8i0s4c8o6').toString('base64'))
    },
    json: {
        name: 'nodeplayground',
        description: 'some idea or code snipet for nodejs -- edit by git-cli'
    }
};

var operation = args[0];

var gitclient = new GithubClient('xujihui1985','C8i0s4c8o6');
gitclient.createRepo({name: args[0], description:args[1]}, function(err, result){
    if(err){
        return console.log('error');
    }
    console.log(result);
});

