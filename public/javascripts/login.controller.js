/**
 * Controller for the Login Page View.
 *
 * Created by Carlos Carvalhal on 10-02-2017.
 */

(function() {
    "use strict";

    angular.module("app").controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "$http", "$location", "$rootScope"];

    function LoginController($scope, $http, $location, $rootScope) {
        $scope.username = "";
        $scope.password = "";
        $scope.statusMessage = "";
        $scope.statusMessageIsError = true;
        $scope.requestInProgress = false;

        $rootScope.user = {};

        /**
         * Checks if there is an authenticated user.
         *
         * @return {boolean} If there is an authenticated user returns "true" otherwise returns "false".
         */
        $scope.isUserAuthenticated = function() {
            var user, name, transactionId;
            return !!(typeof(user = $rootScope.user) === "object" && user !== null
                && typeof(name = user.name) === "string" && name.trim().length > 0
                && typeof(transactionId = user.transactionId) === "string" && transactionId.trim().length > 0);
        };

        /**
         * Callback for the "login" button click event.
         */
        $scope.login = function() {
            $scope.statusMessage = "";
            $scope.requestInProgress = true;
            $http.post("users/authenticate", {username: $scope.username, password: $scope.password})
                .then(loginSuccess, loginError);
        };

        /**
         * Callback for the authentication request success.
         *
         * @param {Object} response The response Object.
         */
        function loginSuccess(response) {
            $scope.statusMessage = "Login success. Entering into the Posts Management Page.";
            $scope.statusMessageIsError = false;
            $scope.requestInProgress = false;

            $rootScope.transactionId = response.data.transactionId;
            $location.path("postsManagement");
        }

        /**
         * Callback for the authentication request error.
         *
         * @param {Object} response The response Object.
         */
        function loginError(response) {
            var errorMessage = response.data;
            if (typeof errorMessage === "object" && errorMessage !== null) {
                errorMessage = errorMessage.error;
            }
            $scope.statusMessage = "Login failed. Reason: " + errorMessage;
            $scope.statusMessageIsError = true;
            $scope.requestInProgress = false;
        }
    } // END: LoginController()

})();