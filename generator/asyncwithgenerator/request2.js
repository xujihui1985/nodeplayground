function request2(url, cb) {
    var data = [1,2,3,4,5];
    setTimeout(fullfilled, 1000);

    function fullfilled () {
        //trunct a double to int
        // simulate some unstable network issue
        var random = (Math.random()*100) | 0;
        if(random < 50) {
            return cb(new Error('request error'));
        }
        cb(null,data);
    }
}

exports = module.exports = request2;
