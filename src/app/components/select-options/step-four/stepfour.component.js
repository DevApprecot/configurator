(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepFour', {
			templateUrl: './app/components/select-options/step-four/stepfour.html',
			controller: StepFourCtrl,
			bindings: {},
		});

	StepFourCtrl.$inject = ['Data'];

	function StepFourCtrl(Data) {
		var ctrl = this;

		ctrl.$onInit = function() {
			console.log('Step four got equipment', Data.get.equipment());
		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
