function Repo(properties) {
    this.properties = args;
}

Repo.prototype = {
    constructor: Repo,

    create: function(){
        return {
            url: 'https://api.github.com/user/repos',
            method: 'post',
            json: this.properties
        }
    }
}
