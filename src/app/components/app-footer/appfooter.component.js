(function () {
    'use strict';


    angular
        .module('configurator')
        .component('appFooter', {
            templateUrl: './app/components/app-footer/appfooter.html',
            controller: AppFooterCtrl,
            bindings: {},
        });

    AppFooterCtrl$inject = [''];

    function AppFooterCtrl() {
        var ctrl = this;



        ctrl.$onInit = function () {};
        ctrl.$onChanges = function (changesObj) {};
        ctrl.$onDestory = function () {};
    }
})();