(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('configurator')
        .component('appHeader', {
            templateUrl: './app/components/app-header/appheader.html',
            controller: AppHeaderCtrl,
            bindings: {},
        });

    AppHeaderCtrl.inject = [''];

    function AppHeaderCtrl() {
        var ctrl = this;



        ctrl.$onInit = function () {};
        ctrl.$onChanges = function (changesObj) {};
        ctrl.$onDestory = function () {};
    }
})();