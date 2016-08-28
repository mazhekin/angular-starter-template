(function() {
    'use strict';

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
                url: '/issues/:owner/:repo/:number',
                templateUrl: 'app/issue/issue.html',
                controller: 'IssueCtrl',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();