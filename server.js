/**
 * The Wiremaze Message Board Server Module.
 *
 * This module will configure and start the HTTP Server and handle the REST requests.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");
var connection = require("./lib/connection");

var users = require("./routes/users");
var comments = require("./routes/comments");

var app = express();

// app.use(favicon(__dirname + "/public/favicon.ico"));
app.use(logger("dev"));
app.use(bodyParser.json());

// To serve the Client Web App.
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));

// Application routes.
app.use(users);
app.use(comments);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handlers.

// Development error handler (will print stacktrace).
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// Production error handler (no stacktraces leaked to user).
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;