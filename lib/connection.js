/**
 * The MongoDB database connection manager for the Wiremaze Message Board.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var mongoose = require("mongoose");

// The MongoDB Database Server URL.
var MONGO_DB_URL = "mongodb://127.0.0.1:27017/wiremaze";

// Establish a connection with the MongoDB database.
var connection = mongoose.connect(MONGO_DB_URL);

// Close the Mongoose connection on Control+C.
process.on("SIGINT", function() {
    mongoose.connection.close(function () {
        console.log("Mongoose connection disconnected.");
        process.exit(0);
    });
});

// Register the Mongoose models.
require("../models/user");
require("../models/comment");

module.exports = connection;