(function() {
    'use strict';

    angular.module('app', [
        'ui.bootstrap',
        'ui.router',

        'ig.linkHeaderParser' // angular-link-header-parser
    ]);

    angular
        .module('app')
        .config(['$locationProvider',  appConfig]);

    function appConfig($locationProvider) {
        $locationProvider.html5Mode(true);
    }
})();