(function() {
    'use strict';

    angular.module('app')
        .factory('githubService', githubService);

    function githubService(apiService, API_URLS, linkHeaderParser, $q) {
        'ngInject';

        var userReposCache = {
            username: null,
            repoNames: []
        };

        return {
            getOwnerRepoIssues: getOwnerRepoIssues,
            getOwnerRepoIssueByNumber: getOwnerRepoIssueByNumber,
            getUserRepoNames: getUserRepoNames
        };

        /////////////////////////////////////////////

        function getOwnerRepoIssues(progress, args) {  // args: owner, repo, page
            var success = function (res) {
              var linkHeaderText = res.headers('Link');
              var linkHeader = linkHeaderParser.parse(linkHeaderText);
              var ret = {
                  issues: res.data
              };
              if (linkHeader.last) {
                  ret.lastPage = parseInt(linkHeader.last.page);
                  ret.perPage = parseInt(linkHeader.last.per_page);
              }
              return ret;
            };
            return apiService.get(progress,
                API_URLS.reposOwnerRepoIssues.replace(':owner', args.owner).replace(':repo', args.repo),
                {per_page: args.perPage, page: args.page}
            ).then(success)
        }

        function getOwnerRepoIssueByNumber(progress, owner, repo, number) {
            var success = function (res) {
                return res.data;
            };
            return apiService.get(progress,
                API_URLS.reposOwnerRepoIssuesNumber.replace(':owner', owner).replace(':repo', repo).replace(':number', number)
            ).then(success)
        }

        function getUserRepoNames (progress, username) {
            var success = function(res) {
                userReposCache.username = username;
                userReposCache.repoNames = res.data.map(function(repo) { return repo.name; });
                return userReposCache.repoNames;
            };
            if (userReposCache.username === username) {
                return $q.when(userReposCache.repoNames);
            } else {
                return apiService.get(progress,
                    API_URLS.usersUsernameRepos.replace(':username', username)
                ).then(success)
            }

        }
    }
})();
