function assert(expr, message) {
    if (!expr) {
        console.error(message);
    }
    else {
        console.info('pass');
    }
}

exports = module.exports = assert;
