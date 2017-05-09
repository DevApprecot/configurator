(function() {
	'use strict';

	angular
		.module('configurator')
		.component('steps', {
			templateUrl: './app/components/select-options/steps/steps.html',
			controller: StepsCtrl,
			bindings: {
				stepsFlag: "<",
				model: "<",
				color: "<",
				hasColors: '<',
				hasEquipments: '<'
			},
		});

	StepsCtrl.$inject = ['Data'];

	function StepsCtrl(Data) {
		var ctrl = this;

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {}
		ctrl.$onDestory = function() {};
	}
})();
