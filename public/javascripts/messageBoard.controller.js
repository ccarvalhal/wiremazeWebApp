/**
 * Controller for the Message Board Page View.
 *
 * Created by Carlos Carvalhal on 10-02-2017.
 */

(function() {
    "use strict";

    angular.module("app").controller("MessageBoardController", MessageBoardController);

    MessageBoardController.$inject = ["$scope", "$http"];

    function MessageBoardController($scope, $http) {
        $scope.commentText = "";
        $scope.commentAuthorName = "";
        $scope.commentAuthorEMail = "";
        $scope.statusMessage = "";
        $scope.statusMessageIsError = true;
        $scope.requestInProgress = false;

        $scope.comments = [];
        getComments();

        /**
         * Callback for the "submitComment" button click event.
         *
         * @param {Object} formElem The Comment Submission Form element.
         */
        $scope.submitComment = function(formElem) {
            $scope.statusMessage = "";
            $scope.requestInProgress = true;
            // Submit the comment.
            $http.put("comments", {authorName: $scope.commentAuthorName,
                    authorEMail: $scope.commentAuthorEMail, comment: $scope.commentText})
                .then(getComments, submitCommentError);
            $scope.resetForm(formElem);
        };

        /**
         * Callback for the submit comment request error.
         *
         * @param {Object} response The response Object.
         */
        function submitCommentError(response) {
            var errorMessage = response.data;
            if (typeof errorMessage === "object" && errorMessage !== null) {
                errorMessage = errorMessage.error;
            }
            $scope.statusMessage = "Submit comment failed. Reason: " + errorMessage;
            $scope.statusMessageIsError = true;
            $scope.requestInProgress = false;
        }

        /**
         * Updates the list of comments.
         */
        function getComments() {
            $scope.statusMessage = "";
            $scope.requestInProgress = true;
            $http.get("comments")
                .then(getCommentsSuccess, getCommentsError);
        }

        /**
         * Callback for the get comments request success.
         *
         * @param {Object} response The response Object.
         */
        function getCommentsSuccess(response) {
            var data = response.data;
            if (typeof(data) === "object" && data !== null && angular.isArray(data.comments)) {
                $scope.comments = data.comments;
            }
            $scope.requestInProgress = false;
        }

        /**
         * Callback for the get comments request error.
         *
         * @param {Object} response The response Object.
         */
        function getCommentsError(response) {
            var errorMessage = response.data;
            if (typeof errorMessage === "object" && errorMessage !== null) {
                errorMessage = errorMessage.error;
            }
            $scope.statusMessage = "Get comments failed. Reason: " + errorMessage;
            $scope.statusMessageIsError = true;
            $scope.requestInProgress = false;
        }

        /**
         * Resets the Comment Submission Form.
         *
         * @param {Object} formElem The Comment Submission Form element.
         */
        $scope.resetForm = function(formElem) {
            $scope.commentText = "";
            $scope.commentAuthorName = "";
            $scope.commentAuthorEMail = "";
            if (formElem) {
                formElem.$setPristine();
                formElem.$setUntouched();
            }
        };
    } // END: MessageBoardController()

})();