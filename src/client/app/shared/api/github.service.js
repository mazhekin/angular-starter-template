(function() {
    'use strict';

    angular.module('app')
        .factory('githubService', githubService);

    function githubService(apiService, API_URLS) {
        'ngInject';

        return {
            getOwnerRepoIssues: getOwnerRepoIssues,
            getOwnerRepoIssueByNumber: getOwnerRepoIssueByNumber
        };

        /////////////////////////////////////////////

        function getOwnerRepoIssues(progress, owner, repo) {
            return apiService.get(progress,
                API_URLS.reposOwnerRepoIssues.replace(':owner', owner).replace(':repo', repo),
                {per_page: 10}
            )
        }

        function getOwnerRepoIssueByNumber(progress, owner, repo, number) {
            return apiService.get(progress,
                API_URLS.reposOwnerRepoIssuesNumber.replace(':owner', owner).replace(':repo', repo).replace(':number', number)
            )
        }

    }
})();
