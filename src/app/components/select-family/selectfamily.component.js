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

	SelectFamilyCtrl.$inject = ['$state'];

	function SelectFamilyCtrl($state) {
		var ctrl = this;

		ctrl.selectFamily = function(family) {
			ctrl.parent.car = angular.copy(angular.extend(ctrl.parent.car, { family }));

			$state.go('app.select-options.step-one', {
				familyId: family.id
			})
		}

		ctrl.cars = [{
			imgUrl: 'assets/img/car-1.png',
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
			imgUrl: 'assets/img/car-2.png',
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
