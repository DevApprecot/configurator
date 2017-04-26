(function() {
	'use strict';

	angular
		.module('configurator')
		.component('selectFamily', {
			templateUrl: './app/components/select-family/selectfamily.html',
			controller: SelectFamilyCtrl,
			require: {
				parent: '^app'
			}
		});

	SelectFamilyCtrl.$inject = [];

	function SelectFamilyCtrl() {
		var ctrl = this;

		ctrl.selectFamily = function(family) {
			ctrl.parent.car = angular.copy(angular.extend(ctrl.parent.car, { family }))
		}

		ctrl.cars = [{
			imgUrl: 'http://local.tessera.gr:8113/files4users/images/vehicles/5G13AP_yyy_zzzz_uuu_1_a.png',
			description: 'A very nice car',
			name: 'Golf',
			id: 1,
			cost: 18589
        }, {
			imgUrl: 'qweaseqwe',
			description: 'A very nice car',
			name: 'Polo',
			id: 2,
			cost: 16898
        }, {
			imgUrl: 'http://local.tessera.gr:8113/files4users/images/vehicles/5T13EX_TU5_zzzz_uuu_1_a.png',
			description: 'A very beautiful car',
			name: 'Touran',
			id: 3,
			cost: 17982
        }]

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
