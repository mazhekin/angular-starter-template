(function() {
    'use strict';

    angular.module('app').controller('TopNav', TopNav);

    function TopNav($scope) {

        /*jshint validthis: true */
        var vm = this;

        $scope.$on('user-logged-changed', function(event, authUser) {
        });

    }
})();
