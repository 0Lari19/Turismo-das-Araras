const { randomUUID } = require('node:crypto');

module.exports = function requestId(req, res, next) {
  const id = req.get('X-Request-Id') || randomUUID();
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
};
