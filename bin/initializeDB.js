/**
 * Initialize the Wiremaze Message Board database.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var crypto = require("crypto");
var async = require("async");
var mongoose = require("mongoose");
require(process.cwd() + "/lib/connection");

var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

// The initial content of the Users and Comments Collections.
var initialUsers = [
    {username: "admin", password: crypto.createHash('md5').update("1234567890").digest("hex")}
];
var initialComments = [
    {id: "1", submissionDateTime: 1486470600000, authorName: "Manuel Assunção",
        authorEMail: "manuel.assuncao@gmail.com",
        avatar: "https://www.gravatar.com/avatar/6ff77fd8232fd1ecff8c4839e381c524?s=50&d=identicon",
        comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor purus sit amet risus ultricies, sed vulputate enim egestas. Duis non arcu purus. Cras porttitor semper blandit. Donec bibendum varius felis. Mauris lacinia laoreet leo ut ornare. Quisque malesuada arcu augue, consequat iaculis augue consequat ut. Aenean eu faucibus ipsum, vitae dignissim enim. Nam id lorem et quam mattis vehicula. Nullam in bibendum lacus. Nunc vitae est ante. Cras ornare quis urna quis euismod. Pellentesque sed nulla ut ante pellentesque mollis sed eu nunc. Donec placerat, mauris sed molestie pellentesque, nisl libero volutpat turpis, vitae consectetur lectus ipsum et nisi."},
];

/**
 * Delete all the users from the Users Collection.
 *
 * @param {function} callback The callback to be called on the conclusion of the users deleting.
 */
var deleteUsers = function(callback) {
    console.info("Deleting users.");
    User.remove({}, function(error, response) {
        if (error) {
            console.error("Error deleting users: %s", error);
        }
        console.info("Done deleting users.");
        callback();
    });
};

/**
 * Add all the users to the Users Collection.
 *
 * @param {function} callback The callback to be called on the conclusion of the users adding.
 */
var addUsers = function(callback) {
    console.info("Adding users.");
    User.create(initialUsers, function (error) {
        if (error) {
            console.error("Error adding users: %s", error);
        }
        console.info("Done adding users.");
        callback();
    });
};

/**
 * Delete all the comments from the Comments Collection.
 *
 * @param {function} callback The callback to be called on the conclusion of the comments deleting.
 */
var deleteComments = function(callback) {
    console.info("Deleting comments.");
    Comment.remove({}, function(error, response) {
        if (error) {
            console.error("Error deleting comments: %s", error);
        }
        console.info("Done deleting comments.");
        callback();
    });
};

/**
 * Add the initial comments to the Comments Collection.
 *
 * @param {function} callback The callback to be called on the conclusion of the comments adding.
 */
var addComments = function(callback) {
    console.info("Adding comments.");
    Comment.create(initialComments, function (error) {
        if (error) {
            console.error("Error adding commnets: %s", error);
        }
        console.info("Done adding comments.");
        callback();
    });
};

console.log("Initializing the Wiremaze Message Board database.");
async.series([
    deleteUsers,
    addUsers,
    deleteComments,
    addComments
], function(error, results) {
    if (error) {
        console.error("Error initializing the Wiremaze Message Board database: %s", error);
    }
    mongoose.connection.close();
    console.log("The Wiremaze Message Board database was successfully initialized.");
});