"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("./models/User.js"));

var _Article = _interopRequireDefault(require("./models/Article.js"));

var _Comment = _interopRequireDefault(require("./models/Comment.js"));

var _Category = _interopRequireDefault(require("./models/Category.js"));

var _serverSetup = _interopRequireDefault(require("./helpers/server-setup.js"));

var _middleware = _interopRequireDefault(require("./helpers/middleware.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("dotenv").config();

var app = (0, _express.default)();

_mongoose.default.connect(process.env.MONGODB_CONNECTION_LINK, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  app.listen(process.env.APP_PORT, function () {
    console.log("Connect");
  });
});

app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use(_express.default.json());
app.post("/login", function (req, res, next) {
  _User.default.findOne({
    email: req.body.user.email
  }, function (err, user) {
    if (err) {
      res.send(err);
    }

    if (!user) {
      res.status(401);
      return next(new Error("Please provide valid email and password"));
    }

    _bcrypt.default.compare(req.body.user.password, user.password, function (errWhenHash, result) {
      if (!result) {
        res.status(401);
        return next(new Error("Please provide valid email and password"));
      } else {
        var jwtToken = _jsonwebtoken.default.sign({}, process.env.RSA_PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: 20 * 60,
          subject: "" + user._id
        });

        res.status(200).send({
          signed_user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          },
          expiresIn: 20 * 60,
          token: jwtToken
        });
      }
    });
  });
});
app.get("/user", function (req, res, next) {
  _serverSetup.default.getDocumentById(_User.default, req.query.id).then(function (response) {
    return res.status(200).send(response);
  }).catch(function (err) {
    return next(err);
  });
});
app.post("/create-user", function (req, res, next) {
  var user = new _User.default(req.body.user);

  _bcrypt.default.hash(req.body.user.password, 10, function (err, hash) {
    user.password = hash;

    _serverSetup.default.insertDocument(user).then(function (response) {
      return res.send(response);
    }).catch(function (err) {
      return next(err);
    });
  });
}); //app.use(middleware.ensureAuthenticated);

app.get("/articles", function (req, res, next) {
  // serverSetup.checkUser(req.decoded.sub, res, () => {
  _serverSetup.default.populateQuery(_Article.default, "_author _category").then(function (response) {
    return res.status(200).send(response);
  }).catch(function (err) {
    return next(err);
  }); // });

});
app.post("/save-article", function (req, res, next) {
  if (!req.body.article._id) {
    var article = new _Article.default(req.body.article);

    _serverSetup.default.saveDocument(article).then(function (response) {
      return res.send(response);
    }).catch(function (err) {
      return next(err);
    });
  } else {
    _serverSetup.default.getDocumentById(_Article.default, req.body.article._id).then(function (article) {
      article.title = req.body.article.title;
      article.content = req.body.article.content;
      article._category = req.body.article._category;
      article.last_updated = req.body.article.last_updated;

      _serverSetup.default.saveDocument(article).then(function (response) {
        return res.send(response);
      }).catch(function (err) {
        return next(err);
      });
    });
  }
});
app.post("/delete-article", function (req, res, next) {
  _serverSetup.default.deleteDocument(_Article.default, {
    _id: req.body.article._id
  }).then(function (response) {
    return res.send(response);
  }).catch(function (err) {
    return next(err);
  });
});
app.get("/comments-by-articleid", function (req, res, next) {
  // serverSetup.checkUser(req.decoded.sub, res, () => {
  _serverSetup.default.populateQuery(_Comment.default, {
    path: "_author",
    select: "email firstName lastName _id"
  }, {
    _article: req.query.articleId
  }).then(function (response) {
    return res.status(200).send(response);
  }).catch(function (err) {
    return next(err);
  }); // });

});
app.post("/save-comment", function (req, res, next) {
  var comment = new _Comment.default(req.body.comment);

  _serverSetup.default.saveDocument(comment).then(function (response) {
    return res.send(response);
  }).catch(function (err) {
    return next(err);
  });
});
app.post("/delete-comment", function (req, res, next) {
  _serverSetup.default.deleteDocument(_Comment.default, {
    _id: req.body.comment._id
  }).then(function (response) {
    return res.send(response);
  }).catch(function (err) {
    return next(err);
  });
});
app.get("/categories", function (req, res, next) {
  _serverSetup.default.getDocuments(_Category.default, {}, "name").then(function (response) {
    return res.status(200).send(response);
  }).catch(function (err) {
    return next(err);
  });
});
app.post("/save-category", function (req, res, next) {
  var category = new _Category.default(req.body.category);

  _serverSetup.default.saveDocument(category).then(function (response) {
    return res.send(response);
  }).catch(function (err) {
    return next(err);
  });
});
app.use(function (err, req, res, next) {
  res.status(500);
  res.statusMessage = err;
  res.send(err);
});