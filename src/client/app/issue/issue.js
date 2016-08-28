(function () {
    'use strict';

    angular.module('app').controller('IssueCtrl', IssueCtrl);

    /* @ngInject */
    function IssueCtrl($timeout, $stateParams, githubService) {
        /* jshint validthis: true */
        var vm = this;
        vm.issue = null;
        vm.error = null;

        $timeout(activate); // to affect progress

        ////////////////

        function activate() {
            var success = function(data) {
                vm.issue = data;
            };
            var error = function(error) {
                vm.error = error.statusText;
            };
            githubService.getOwnerRepoIssueByNumber('shell-progress', $stateParams.owner, $stateParams.repo, $stateParams.number).then(success, error)
        }
    }
})();