var tasks = require('./lib/tasks'),
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

if(typeof tasks[operation] === 'function') {
    tasks[operation]({
        name: args[1],
        description: args[2]
    }, function(err, success){
        if(err){
            throw err;
        }
        console.log('success');
    });
}else {
    throw new Error('not supported operation ' + operation);
}

