/**
 * Controller for the Posts Management Page View.
 *
 * Created by Carlos Carvalhal on 10-02-2017.
 */

(function() {
    "use strict";

    angular.module("app").controller("PostsManagementController", PostsManagementController);

    PostsManagementController.$inject = ["$scope", "$http", "$location", "$rootScope"];

    function PostsManagementController($scope, $http, $location, $rootScope) {
        $scope.statusMessage = "";
        $scope.statusMessageIsError = true;
        $scope.requestInProgress = false;
        $scope.comments = [];

        if (typeof($rootScope.transactionId) !== "string" || $rootScope.transactionId.trim().length === 0) {
            $location.path("login");
        } else {
            getComments();
        }

        /**
         * Validates the comment with the ID referred by the argument "commentId".
         *
         * @param {String} commentId The ID of the comment to be validated.
         */
        $scope.validateComment = function(commentId) {
            $scope.statusMessage = "";
            $scope.requestInProgress = true;
            $http.post("comments/" + commentId, {transactionId: $rootScope.transactionId, isValidated: true})
                .then(commentManagementSuccess, commentManagementError);
        };

        /**
         * Removes the comment with the ID referred by the argument "commentId".
         *
         * @param {String} commentId The ID of the comment to be removed.
         */
        $scope.removeComment = function(commentId) {
            $scope.statusMessage = "";
            $scope.requestInProgress = true;
            $http.delete("comments/" + commentId + "?transactionId=" + $rootScope.transactionId)
                .then(commentManagementSuccess, commentManagementError);
        };

        /**
         * Callback for the comment management request success.
         *
         * @param {Object} response The response Object.
         */
        function commentManagementSuccess(response) {
            $rootScope.transactionId = response.data.transactionId;
            getComments();
        }

        /**
         * Callback for the comment management request error.
         *
         * @param {Object} response The response Object.
         */
        function commentManagementError(response) {
            var errorMessage = response.data;
            if (typeof errorMessage === "object" && errorMessage !== null) {
                $rootScope.transactionId = errorMessage.transactionId;
                errorMessage = errorMessage.error;
            }
            $scope.statusMessage = "Comment management operation failed. Reason: " + errorMessage;
            $scope.statusMessageIsError = true;
            $scope.requestInProgress = false;
        }

        /**
         * Updates the list of comments.
         */
        function getComments() {
            $scope.statusMessage = "";
            $scope.requestInProgress = true;
            $http.get("comments?transactionId=" + $rootScope.transactionId)
                .then(getCommentsSuccess, getCommentsError);
        }

        /**
         * Callback for the get comments request success.
         *
         * @param {Object} response The response Object.
         */
        function getCommentsSuccess(response) {
            var data = response.data;
            $rootScope.transactionId = response.data.transactionId;
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
                $rootScope.transactionId = errorMessage.transactionId;
                errorMessage = errorMessage.error;
            }
            $scope.statusMessage = "Get comments failed. Reason: " + errorMessage;
            $scope.statusMessageIsError = true;
            $scope.requestInProgress = false;
        }
    } // END: PostsManagementController()

})();