(function () {
    'use strict';

    angular
        .module('configurator')
        .controller('BaseCtrl', BaseCtrl);

    BaseCtrl.inject = [''];

    function BaseCtrl() {
        var vm = this;


        activate();


        function activate() {
            vm.theme = "default";
        }
    }
})();