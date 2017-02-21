/**
 * Defines the Mongoose Comment model.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    authorName: {
        type: String,
        required: true
    },
    authorEMail: {
        type: String,
        required: true
    },
    submissionDateTime: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    isValidated: {
        type: Boolean,
        required: true,
        default: false
    },
    comment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Comment", CommentSchema);