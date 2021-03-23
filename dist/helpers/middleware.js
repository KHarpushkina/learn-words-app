"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  ensureAuthenticated: function ensureAuthenticated(req, res, next) {
    var token = req.headers["x-access-token"] || req.headers["authorization"];

    if (token) {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }

      _jsonwebtoken.default.verify(token, process.env.RSA_PUBLIC_KEY, {
        algorithms: ["RS256"]
      }, function (err, decoded) {
        if (err) {
          res.status(401);
          return next(new Error("Session has expired. Please login"));
        } else {
          req.decoded = decoded;
          return next();
        }
      });
    } else {
      res.status(401);
      return next(new Error("Login required"));
    }
  }
};