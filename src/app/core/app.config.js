(function () {
    'use strict';
    angular.module('configurator')

        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider']

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('app', {
                url: '/app',
                template: '<app></app>'
            })

            .state('app.select-model', {
                url: '/select-model',
                template: '<select-model></select-model>'
            })



        $urlRouterProvider.otherwise('/app/select-model');

    }
})();