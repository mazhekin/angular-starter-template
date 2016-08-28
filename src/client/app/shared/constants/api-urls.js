(function() {

    angular.module('app').service('API_URLS', API_URLS);

    function API_URLS (configService) {
        'ngInject';

        var root = configService.apiRoot;
        var urls = {
            reposOwnerRepoIssues:           '/repos/:owner/:repo/issues',
            reposOwnerRepoIssuesNumber:     '/repos/:owner/:repo/issues/:number',
            usersUsernameRepos:             '/users/:username/repos'
        };
        Object.getOwnPropertyNames(urls).forEach(function(name) {
            urls[name] = root + urls[name];
        });
        return urls;
    }

})();
