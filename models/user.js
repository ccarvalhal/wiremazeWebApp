/**
 * Defines the Mongoose User model.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);