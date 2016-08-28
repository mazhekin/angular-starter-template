(function () {
    'use strict';

    angular.module('app').controller('IssuesCtrl', IssuesCtrl);

    /* @ngInject */
    function IssuesCtrl($state) {
        /* jshint validthis: true */
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('current state data', $state.current.data);
        }

        vm.navigate = function () {
            $state.go('issue');
        }
    }
})();