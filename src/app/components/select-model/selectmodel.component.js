(function () {
    'use strict';



    angular
        .module('configurator')
        .component('selectModel', {
            templateUrl: './app/components/select-model/selectmodel.html',
            controller: SelectModelCtrl,
            bindings: {},
        });

    SelectModelCtrl.inject = [];

    function SelectModelCtrl() {
        var ctrl = this;


        ctrl.cars = [{
            imgUrl: 'http://local.tessera.gr:8113/files4users/images/vehicles/5G13AP_yyy_zzzz_uuu_1_a.png',
            description: 'A very nice car',
            name: 'Golf',
            id: 1
        },{
            imgUrl: 'qweaseqwe',
            description: 'A very nice car',
            name: 'Polo',
            id: 2
        },{
            imgUrl: 'http://local.tessera.gr:8113/files4users/images/vehicles/5T13EX_TU5_zzzz_uuu_1_a.png',
            description: 'A very beautiful car',
            name: 'Touran',
            id: 3
        }]


        ctrl.$onInit = function () {};
        ctrl.$onChanges = function (changesObj) {};
        ctrl.$onDestory = function () {};
    }
})();