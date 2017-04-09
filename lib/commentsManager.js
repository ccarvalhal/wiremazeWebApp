/**
 * The Comments's Manager for the Wiremaze Message Board.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var crypto = require("crypto");
var mongoose = require("mongoose");
var connection = require(process.cwd() + "/lib/connection");

var Comment = mongoose.model("Comment");

/**
 * Fetches, from the "Comments" collection, all the comments, whether it has been validated or not.
 *
 * @param {function} callback The callback function to be called after the conclusion of the fetch process.
 */
function getAllComments(callback) {
    Comment.find()
        .sort("-submissionDateTime")
        .then(
            function(comments) {
                callback(null, comments);
            },
            function(error) {
                console.error("Error fetching all comments: %s", error);
                callback(error);
            }
        );
}

/**
 * Fetches, from the "Comments" collection, the validated comments.
 *
 * @param {function} callback The callback function to be called after the conclusion of the fetch process.
 */
function getValidatedComments(callback) {
    Comment.find({isValidated: true})
        .sort("-submissionDateTime")
        .then(
            function(comments) {
                callback(null, comments);
            },
            function(error) {
                console.error("Error fetching validated comments: %s", error);
                callback(error);
            }
        );
}

/**
 * Updates the validation state of the comment with the ID referred by the argument "commentId" to the value referred by
 * the argument "validateState".
 *
 * @param {String} commentId The ID of the comment to be validated.
 * @param {boolean} validateState The target validation state for the comment.
 * @param {function} callback The callback function to be called after the conclusion of the updating process.
 */
function updateCommentValidationState(commentId, validateState, callback) {
    Comment.findOneAndUpdate({_id: commentId}, {isValidated: validateState},
        function(error, updatedComment) {
            if (error) {
                console.error("Error while updating the comment with the ID '%s': %s", commentId, error);
                callback(error);
                return false;
            }
            callback(null, updatedComment);
        });
}

/**
 * Adds, to the "Comments" collection, the comment referred by the argument "commentToAdd".
 *
 * @param {Object} commentToAdd Comment to be added to the "Comments" collection.
 * @param {function} callback The callback function to be called after the conclusion of the add process.
 */
function addComment(commentToAdd, callback) {
    Comment.create(commentToAdd, function (error, commentAdded) {
        if (error) {
            console.error("Error while adding the comment by '%s (%s)': %s",
                commentToAdd.authorName, commentToAdd.authorEMail, error);
            return false;
        }
        callback(null, commentAdded);
    });
}

/**
 * Removes, from the "Comments" collection, the comment with the ID referred by the argument "commentId".
 *
 * @param {String} commentId The ID of the comment to be removed.
 * @param {function} callback The callback function to be called after the conclusion of the remove process.
 * @return {boolean} If the comment to be removed does not exist, returns "false" otherwise returns "true".
 */
function removeComment(commentId, callback) {
    Comment.findOneAndRemove({_id: commentId}, function(error, removedComment) {
        if (error) {
            console.error("Error while removing the comment with the ID '%s': %s", commentId, error);
            return false;
        }
        callback(null, removedComment);
    })
}

module.exports.getAllComments = getAllComments;
module.exports.getValidatedComments = getValidatedComments;
module.exports.addComment = addComment;
module.exports.updateCommentValidationState = updateCommentValidationState;
module.exports.removeComment = removeComment;