/**
 * The Express Route for the Comments related requests.
 *
 * Created by Carlos Carvalhal on 17-02-2017.
 */

var express = require("express");
var router = express.Router();
var crypto = require("crypto");

// The Comments Manager.
var commentsManager = require(process.cwd() + "/lib/commentsManager");

// The Transaction Manager.
var transactionManager = require(process.cwd() + "/lib/transactionManager");

// Gets comments. If the request has a payload containing a valid "transactionId", the response will include all the
// comments, whether it has been validated or not, otherwise only the validated messages will be returned.
router.get("/comments", function(req, res, next) {
    var transactionId = req.query.transactionId;
    var newTransactionId;
    if (typeof(transactionId) === "string") {
        newTransactionId = transactionManager.checkTransaction(transactionId);
    }
    if (newTransactionId === undefined) {
        console.log("Fetching validated comments.");
        commentsManager.getValidatedComments(function(error, comments) {
            if (error) {
                console.log("An error occurred while fetching validated comments: %s", error);
                res.status(500).json({error: "It was not possible to fetch the validated comments."});
                return false;
            }
            console.log("It was fetched '%d' comments.", comments.length);
            res.json({comments: comments});
        });
    } else {
        console.log("Fetching all the comments.");
        commentsManager.getAllComments(function(error, comments) {
            if (error) {
                console.log("An error occurred while fetching all the comments: %s", error);
                res.status(500).json({error: "It was not possible to fetch all the comments.",
                    transactionId: newTransactionId});
                return false;
            }
            console.log("It was fetched '%d' comments.", comments.length);
            res.json({transactionId: newTransactionId, comments: comments});
        });
    }
});

// Changes the validation state of the comment referred by ":commentId".
router.post("/comments/:commentId", function(req, res, next) {
    var transactionId = req.body.transactionId;
    var validationState = req.body.isValidated;
    var commentId = req.params.commentId;

    var newTransactionId = transactionManager.checkTransaction(transactionId);
    if (newTransactionId === undefined) {
        res.status(401).json({error: "Unauthorized"});
        return false;
    }

    if (typeof(validationState) !== "boolean") {
        res.status(400).json({error: "Invalid target validation state.", transactionId: newTransactionId});
        return false;
    }

    commentsManager.updateCommentValidationState(commentId, validationState, function(error, updatedComment) {
        if (error) {
            console.error("An error occurred while updating the validation state of the comment with the ID '%s': %s",
                commentId, error);
            res.status(500).json({error: "It was not possible to update the validation state of the comment.",
                transactionId: newTransactionId});
            return false;
        }
        if (typeof(updatedComment) === "object" && updatedComment !== null) {
            console.log("The validation state of the comment with the ID '%s' was successfully updated.", commentId);
            res.json({transactionId: newTransactionId, comment: updatedComment});
        } else {
            console.error("The comment with the ID '%s' does not exist.", commentId);
            res.status("404").json({error: "The comment does not exist.", transactionId: newTransactionId});
        }
    });
});

// Insert the comment described in payload.
router.put("/comments", function(req, res, next) {
    var authorName = req.body.authorName;
    var authorEMail = req.body.authorEMail;
    var comment = req.body.comment;

    if (typeof(authorName) !== "string" || authorName.trim().length === 0
        || typeof(authorEMail) !== "string" || authorEMail.trim().length === 0
        || typeof(comment) !== "string" || comment.trim().length === 0) {
        res.status(400).json({error: "Invalid comment."});
        return false;
    }

    var commentToAdd = {authorName: authorName, authorEMail: authorEMail, comment: comment,
        submissionDateTime: new Date().getTime(),
        avatar: "https://www.gravatar.com/avatar/"
            + crypto.createHash('md5').update(authorEMail).digest("hex")
            + "?s=50&d=identicon"};
    commentsManager.addComment(commentToAdd, function(error, commentAdded) {
        if (error) {
            console.error("An error occurred while inserting the comment by '%s (%s)': %s",
                authorName, authorEMail, error);
            res.status(500).json({error: "It was not possible to insert the comment."});
            return false;
        }
        console.log("The comment by '%s (%s)' was successfully inserted.", authorName, authorEMail);
        res.json(commentAdded);
    });
});

// Removes the comment with the ID referred by ":commentId".
router.delete("/comments/:commentId", function(req, res, next) {
    var transactionId = req.query.transactionId;
    var commentId = req.params.commentId;

    var newTransactionId = transactionManager.checkTransaction(transactionId);
    if (newTransactionId === undefined) {
        res.status(401).json({error: "Unauthorized"});
        return false;
    }

    commentsManager.removeComment(commentId, function(error, removedComment) {
        if (error) {
            console.error("An error occurred while removing the comment with the ID '%s': %s", commentId, error);
            res.status(500).json({error: "It was not possible to remove the comment.",
                transactionId: newTransactionId});
            return false;
        }
        if (typeof(removedComment) === "object" && removedComment !== null) {
            console.log("The comment with the ID '%s' was successfully removed.", commentId);
            res.json({transactionId: newTransactionId, comment: removedComment});
        } else {
            console.error("The comment with the ID '%s' does not exist.", commentId);
            res.status(404).json({error: "The comment does not exist.", transactionId: newTransactionId});
        }
    });
});

module.exports = router;