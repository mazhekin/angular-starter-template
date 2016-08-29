(function () {
    'use strict';

    angular.module('app').controller('IssuesCtrl', IssuesCtrl);

    /* @ngInject */
    function IssuesCtrl($state, githubService) {
        /* jshint validthis: true */
        var vm = this;
        vm.error = null;
        vm.issues = null;

        vm.totalItemsRoughly = 0;
        vm.currentPage = 1;
        vm.maxSize = 10;
        vm.perPageSelect = '10';

        activate();

        ////////////////

        function activate() {
            //vm.owner = 'ng-bootstrap';
            //vm.repo = 'ng-bootstrap';
        }

        vm.navigate = function () {
            $state.go('issue');
        };

        vm.pageChanged = function () {
            vm.searchIssues(vm.currentPage);
        };

        vm.searchIssues = function (page) {
            vm.perPage = vm.perPageSelect;
            vm.error = null;
            var success = function(data) {
                vm.issues = data.issues;
                if (data.lastPage) {
                    vm.totalItemsRoughly = data.lastPage * data.perPage;
                }
            };
            var error = function(res) {
                vm.error = res.statusText;
            };
            var args = {
                owner: vm.owner,
                repo: vm.repo,
                page: page,
                perPage: parseInt(vm.perPage)
            };
            githubService.getOwnerRepoIssues('shell-progress', args).then(success, error);
        };

        vm.getRepoNames = function(val) {
            var success = function (repoNames) {
                return repoNames.filter(function(repoName) { return repoName.indexOf(val) !== -1; });
            };
            return githubService.getUserRepoNames(null, vm.owner).then(success);
        };
    }
})();