(function() {
    'use strict';

    angular.module('app')
        .factory('configService', configService);

    function configService() {

        return {
            apiRoot: 'https://api.github.com'
        };

        /////////////////////////////////////////////
    }
})();