var util = require('util');


function HttpError() {
  Error.call(this, arguments);
}

util.inherits(HttpError, Error);

function NotFound(message) {
  HttpError.call(this);
  Error.captureStackTrack(this,arguments.callee);
  this.statusCode = 404;
  this.message = message;
  this.name = 'NotFound';
}

util.inherits(NotFound, HttpError);

module.exports = {
  NotFound: NotFound,
  HttpError: HttpError
};
