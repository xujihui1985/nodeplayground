function request(url, cb) {
    var data = [1,2,3,4,5];
    setTimeout(fullfilled, 1000);

    function fullfilled () {
        cb(data);
    }
}

exports = module.exports = request;
