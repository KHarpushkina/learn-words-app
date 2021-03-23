"use strict";

var _bluebird = require("bluebird");

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  checkUser: function checkUser(id, res, callback) {
    _User.default.findOne({
      _id: id
    }, function (err, user) {
      if (err) {
        res.send(err);
      } else {
        if (!user) {
          throw new Error(JSON.stringify({
            status: 401,
            message: "Please provide valid email and password"
          }));
        }

        callback();
      }
    });
  },
  getDocumentById: function getDocumentById(model, id) {
    var fields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return model.findById(id, fields).exec();

            case 2:
              result = _context.sent;

              if (!result) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", result);

            case 7:
              throw new Error(JSON.stringify({
                status: 404,
                message: "No such document in the database"
              }));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getDocuments: function getDocuments(model) {
    var selectors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var sortField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var fields = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
    return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return model.find(selectors, fields, options).sort(sortField).exec();

            case 2:
              result = _context2.sent;

              if (!result) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", result);

            case 7:
              throw new Error(JSON.stringify({
                status: 404,
                message: "No such documents in the database"
              }));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  saveDocument: function saveDocument(document) {
    return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var result;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return document.save();

            case 2:
              result = _context3.sent;

              if (!result) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", result);

            case 7:
              throw new Error(JSON.stringify({
                status: 404,
                message: "Failed to save document"
              }));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  deleteDocument: function deleteDocument(model, selectors) {
    return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var result;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return model.deleteOne(selectors);

            case 2:
              result = _context4.sent;

              if (!result) {
                _context4.next = 7;
                break;
              }

              return _context4.abrupt("return", result);

            case 7:
              throw new Error(JSON.stringify({
                status: 404,
                message: "Failed to delete document"
              }));

            case 8:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  populateQuery: function populateQuery(model, populateObject) {
    var selectors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return (0, _bluebird.coroutine)( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
      var result;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              result = model.find(selectors).populate(populateObject).exec();

              if (!result) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return", result);

            case 5:
              throw new Error(JSON.stringify({
                status: 404,
                message: "No such documents in the database"
              }));

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  }
};