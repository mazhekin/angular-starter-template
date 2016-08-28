(function () {
    'use strict';

    angular.module('app').controller('IssueCtrl', IssueCtrl);

    /* @ngInject */
    function IssueCtrl($state, $stateParams, githubService) {
        /* jshint validthis: true */
        var vm = this;
        vm.issue = null;
        vm.error = null;

        activate();

        ////////////////

        function activate() {
            var success = function(data) {
                vm.issue = data;
            };
            var error = function(error) {
                vm.error = error.statusText;
            };
            githubService.getOwnerRepoIssueByNumber(null, $stateParams.owner, $stateParams.repo, $stateParams.number).then(success, error)
        }
    }
})();