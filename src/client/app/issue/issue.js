(function () {
    'use strict';

    angular.module('app').controller('IssueCtrl', IssueCtrl);

    /* @ngInject */
    function IssueCtrl($state) {
        /* jshint validthis: true */
        var vm = this;

        activate();

        ////////////////

        function activate() {
            console.log('current state data', $state.current.data);
        }
    }
})();