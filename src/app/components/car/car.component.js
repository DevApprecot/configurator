(function() {
	'use strict';

	angular
		.module('configurator')
		.component('car', {
			templateUrl: './app/components/car/car.html',
			controller: CarCtrl,
			bindings: {
				car: '<',
				onSelect: '&'
			},
		});

	CarCtrl$inject = ['$state', '$stateParams'];

	function CarCtrl($state, $stateParams) {
		var ctrl = this;
		ctrl.defaultImg = './assets/img/no-vehicle-sm.png';

		ctrl.goTo = function(id) {

			const currentState = $state.current.name;

			if (currentState == 'app.select-family') {
				$state.go('app.select-model', {
					familyId: id
				})
			} else if (currentState == 'app.select-model') {
				$state.go('app.select-options', {
					familyId: $stateParams.familyId,
					modelId: id
				})
			}
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
