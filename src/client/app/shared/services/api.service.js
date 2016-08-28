(function() {
    'use strict';

    angular.module('app')
        .factory('apiService', apiService);

    function apiService($http, $q, progressService) {
        'ngInject';

        return {
            get: getRequest,
            post: postRequest,
            put: putRequest,
            delete: deleteRequest
        };

        /////////////////////////////////////////////

        function successHandler(result) {
            return result;
        }

        function errorHandler(result) {
            return $q.reject(result);
        }

        function getRequest(progress, url, obj) {
            progressService.on(progress);
            return $http.get(url, {params: obj})
                .then(successHandler, errorHandler)
                ['finally'](function () { progressService.off(progress); });
        }

        function postRequest(progress, url, obj) {
            progressService.on(progress);
            return $http.post(url, obj)
                .then(successHandler, errorHandler)
                .finally(function () { progressService.off(progress); });
        }

        function putRequest(progress, url, obj) {
            progressService.on(progress);
            return $http.put(url, obj)
                .then(successHandler, errorHandler)
                .finally(function () { progressService.off(progress); });
        }

        function deleteRequest(progress, url, obj) {
            progressService.on(progress);
            return $http.delete(url, obj)
                .then(successHandler, errorHandler)
                .finally(function () { progressService.off(progress); });
        }
    }
})();