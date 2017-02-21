/**
 * The Express Route for the Users related requests.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var express = require("express");
var router = express.Router();

// The Users Manager.
var usersManager = require(process.cwd() + "/lib/usersManager");

// Authenticates the user.
router.post("/users/authenticate", function(req, res, next) {
    var user = {
        username: req.body.username,
        password: req.body.password
    };
    console.log("Authenticating user: %s", user.username);

    // Authenticates the user.
    usersManager.authenticate(user, function(error, transactionId) {
        if (error) {
            return next(error);
        }

        if (transactionId !== undefined) {
            console.log("The user '%s' was successfully authenticated.", user.username);
            res.json({transactionId: transactionId});
        } else {
            console.log("Invalid user: %s", user.username);
            res.status(401).send({error: "Invalid User"});
        }
    });
});

module.exports = router;