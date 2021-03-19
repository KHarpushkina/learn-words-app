import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "./models/User.js";
import Article from "./models/Article.js";
import Comment from "./models/Comment.js";
import Category from "./models/Category.js";
import serverSetup from "./helpers/server-setup.js";
import middleware from "./helpers/middleware.js";

require("dotenv").config();

const app = express();
mongoose.connect(process.env.MONGODB_CONNECTION_LINK, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    app.listen(process.env.APP_PORT, () => {
        console.log("Connect");
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.post("/login", (req, res, next) => {
    User.findOne({ email: req.body.user.email }, (err, user) => {
        if (err) {
            res.send(err);
        }
        if (!user) {
            res.status(401);
            return next(new Error("Please provide valid email and password"));
        }
        bcrypt.compare(req.body.user.password, user.password, (errWhenHash, result) => {
            if (!result) {
                res.status(401);
                return next(new Error("Please provide valid email and password"));
            } else {
                const jwtToken = jwt.sign({}, process.env.RSA_PRIVATE_KEY, {
                    algorithm: "RS256",
                    expiresIn: 20 * 60,
                    subject: "" + user._id,
                });
                res.status(200).send({
                    signed_user: {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    expiresIn: 20 * 60,
                    token: jwtToken,
                });
            }
        });
    });
});

app.get("/user", (req, res, next) => {
    serverSetup
        .getDocumentById(User, req.query.id)
        .then((response) => res.status(200).send(response))
        .catch((err) => next(err));
});

app.post("/create-user", (req, res, next) => {
    let user = new User(req.body.user);
    bcrypt.hash(req.body.user.password, 10, function(err, hash) {
        user.password = hash;
        serverSetup
            .insertDocument(user)
            .then((response) => res.send(response))
            .catch((err) => next(err));
    });
});

//app.use(middleware.ensureAuthenticated);

app.get("/articles", (req, res, next) => {
    // serverSetup.checkUser(req.decoded.sub, res, () => {
    serverSetup
        .populateQuery(Article, "_author _category")
        .then((response) => res.status(200).send(response))
        .catch((err) => next(err));
    // });
});

app.post("/save-article", (req, res, next) => {
    if (!req.body.article._id) {
        let article = new Article(req.body.article);
        serverSetup
            .saveDocument(article)
            .then((response) => res.send(response))
            .catch((err) => next(err));
    } else {
        serverSetup.getDocumentById(Article, req.body.article._id).then((article) => {
            article.title = req.body.article.title;
            article.content = req.body.article.content;
            article._category = req.body.article._category;
            article.last_updated = req.body.article.last_updated;
            serverSetup
                .saveDocument(article)
                .then((response) => res.send(response))
                .catch((err) => next(err));
        });
    }
});

app.post("/delete-article", (req, res, next) => {
    serverSetup
        .deleteDocument(Article, { _id: req.body.article._id })
        .then((response) => res.send(response))
        .catch((err) => next(err));
});

app.get("/comments-by-articleid", (req, res, next) => {
    // serverSetup.checkUser(req.decoded.sub, res, () => {
    serverSetup
        .populateQuery(
            Comment,
            { path: "_author", select: "email firstName lastName _id" },
            { _article: req.query.articleId }
        )
        .then((response) => res.status(200).send(response))
        .catch((err) => next(err));
    // });
});

app.post("/save-comment", (req, res, next) => {
    let comment = new Comment(req.body.comment);
    serverSetup
        .saveDocument(comment)
        .then((response) => res.send(response))
        .catch((err) => next(err));
});

app.post("/delete-comment", (req, res, next) => {
    serverSetup
        .deleteDocument(Comment, { _id: req.body.comment._id })
        .then((response) => res.send(response))
        .catch((err) => next(err));
});

app.get("/categories", (req, res, next) => {
    serverSetup
        .getDocuments(Category, {}, "name")
        .then((response) => res.status(200).send(response))
        .catch((err) => next(err));
});

app.post("/save-category", (req, res, next) => {
    let category = new Category(req.body.category);
    serverSetup
        .saveDocument(category)
        .then((response) => res.send(response))
        .catch((err) => next(err));
});

app.use((err, req, res, next) => {
    res.status(500);
    res.statusMessage = err;
    res.send(err);
});
