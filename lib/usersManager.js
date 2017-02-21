/**
 * The User's Manager for the Wiremaze Message Board.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var crypto = require("crypto");
var mongoose = require("mongoose");
var connection = require(process.cwd() + "/lib/connection");

var User = mongoose.model("User");

// The Transaction Manager.
var transactionManager = require(process.cwd() + "/lib/transactionManager");

/**
 * Authenticate the user with the credentials referred by the argument "targetUser".
 *
 * @param {Object} targetUser The credentials of the user to be authenticated.
 * @param {function} callback The callback to be called after the conclusion of the authentication proccess.
 * @return {String} The transaction ID to be used by the user in the net access.
 */
function authenticate(targetUser, callback) {
    User.findOne({username: targetUser.username})
        .then(
            function (user) {
                if (typeof(user) === "object" && user !== null
                    && user.password === crypto.createHash('md5').update(targetUser.password).digest("hex")) {
                    callback(null, transactionManager.getNewTransaction());
                } else {
                    callback(null, undefined);
                }
            },
            function(error) {
                console.error("Error finding user to authenticate: %s", error);
                callback(error);
            }
        );
}

module.exports.authenticate = authenticate;