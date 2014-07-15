var request = require('request');
//{
                //name: 'gitcliTest',
                //description: 'this repository is created by git-cli'
            //}

module.exports = {
    create : function(args, callback){
        validate(args);
        var createUrl = 'https://api.github.com/user/repos',
            method = 'post',
            createOptions = {
                url: createUrl,
                method: method,
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'xujihui1985',
                    'Content-type': 'application/json',
                    'Authorization': 'Basic '+(new Buffer('xujihui1985:C8i0s4c8o6').toString('base64'))
                },
                json: args
            };

        request(createOptions, function(err, response, body){
            if(err) {
                return callback(err, null);
            }
            callback(null, true);
        });

        function validate(args){
            if(!args.name) {
                throw new Error('name is manditory');
            }
        }
    }
}
