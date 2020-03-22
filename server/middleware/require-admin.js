const HttpError = require('http-errors');

const requireAdmin = function (req, res, next) {
  if (req.user && req.user.roles.indexOf('admin') > -1) return next();
  const err = new HttpError(401);
  return next(err);
};

module.exports = requireAdmin;
