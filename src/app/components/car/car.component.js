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

	CarCtrl.$inject = [];

	function CarCtrl() {
		var ctrl = this;
		ctrl.defaultImg = './assets/img/no-vehicle-sm.png';

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
