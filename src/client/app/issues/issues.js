(function () {
    'use strict';

    angular.module('app').controller('IssuesCtrl', IssuesCtrl);

    /* @ngInject */
    function IssuesCtrl($state, githubService) {
        /* jshint validthis: true */
        var vm = this;
        vm.error = null;
        vm.issues = [];

        activate();

        ////////////////

        function activate() {
            console.log('current state data', $state.current.data);
        }

        vm.navigate = function () {
            $state.go('issue');
        };

        vm.searchIssues = function () {
            vm.owner = 'ng-bootstrap';
            vm.repo = 'ng-bootstrap';

            vm.error = null;
            var success = function(data) {
                vm.issues = data;
            };
            var error = function(res) {
                vm.error = res.statusText;
            };
            githubService.getOwnerRepoIssues(null, vm.owner, vm.repo).then(success, error);
        }
    }
})();