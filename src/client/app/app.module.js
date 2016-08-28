/**
 * Created by Vasiliy on 2/17/2015.
 */

(function() {
    'use strict';

    angular.module('app', ['ui.bootstrap', 'ui.router']);

    angular
        .module('app')
        .config(['$locationProvider',  appConfig]);

    function appConfig($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', configRoutes]);

    function configRoutes($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('issues', {
                url: '/',
                templateUrl: 'app/issues/issues.html',
                controller: 'IssuesCtrl',
                controllerAs: 'vm'
            })
            .state('issue', {
                url: '/issue',
                templateUrl: 'app/issue/issue.html',
                controller: 'IssueCtrl',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }



})();