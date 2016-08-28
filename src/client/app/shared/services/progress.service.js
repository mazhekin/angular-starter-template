(function() {
    'use strict';

    angular.module('app')
        .factory('progressService', progressService);

    function progressService($rootScope) {

        return {
            on: on,
            off: off
        };

        /////////////////////////////////////////////

        function on(progress) {
            toggleProgress(progress, true);
        }

        function off(progress) {
            toggleProgress(progress, false);
        }

        function toggleProgress(progress, flag) {
            if (progress) {
                $rootScope.$broadcast(progress, flag);
            }
        }
    }
})();
