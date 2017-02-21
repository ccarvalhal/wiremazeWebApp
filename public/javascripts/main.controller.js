/**
 * Main Controller for the Wiremaze Message Board web application.
 *
 * Created by Carlos Carvalhal on 10-02-2017.
 */

(function() {
    "use strict";

    angular.module("app").controller("MainController", MainController);

    MainController.$inject = ["$scope", "$location"];

    function MainController($scope, $location) {
        /**
         * Returns the name of the current AngularJS Route View.
         *
         * @return {String} The name of the current AngularJS Route View.
         */
        $scope.getCurrentViewName = function() {
            var path, viewNameStartPos, viewName = "";
            if (typeof(path = $location.path()) === "string" && (viewNameStartPos = path.indexOf("/")) >= 0) {
                viewName = path.substring(viewNameStartPos + 1);
            }
            return viewName;
        };

        /**
         * Returns the tip message of the main header.
         *
         * @returns {string} The tip message of the main header.
         */
        $scope.getMainHeaderTipMessage = function() {
            return $scope.getCurrentViewName() === ""
                ? "Clicar para mudar para a vista de Administração"
                : "Clicar para mudar para a vista de Consulta";
        };

        /**
         * Switches between the ANgularJS Route Views "/login" and "/".
         */
        $scope.switchAdminView = function() {
            $location.path($scope.getCurrentViewName() === "" ? "/login" : "/");
        };
    } // END: MainController()

})();