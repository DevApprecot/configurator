(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('configurator')
        .component('app', {
            templateUrl: './app/components/app/app.html',
            controller: AppCtrl,
            bindings: {},
        });

    AppCtrl.inject = [];

    function AppCtrl() {
        var ctrl = this;



        ctrl.$onInit = function () {};
        ctrl.$onChanges = function (changesObj) {};
        ctrl.$onDestory = function () {};
    }
})();