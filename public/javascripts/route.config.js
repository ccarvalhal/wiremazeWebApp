/**
 * Configuration of the AngularJS routes for the Wiremaze Message Board web application.
 *
 * Created by Carlos Carvalhal on 10-02-2017.
 */

(function() {
    "use strict";

    angular.module("app").config(configuration);

    configuration.$inject = ["$routeProvider"];

    function configuration($routeProvider) {
        $routeProvider
            .when("/",
                {
                    templateUrl: "messageBoard.html"
                })
            .when("/login",
                {
                    templateUrl: "login.html"
                })
            .when("/postsManagement",
                {
                    templateUrl: "postsManagement.html"
                })
            .otherwise({redirectTo: "/"})
    } // END: configuration()

})();