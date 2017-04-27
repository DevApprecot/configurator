(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepThree', {
			templateUrl: './app/components/select-options/step-three/stepthree.html',
			controller: StepThreeCtrl,
			bindings: {},
		});

	StepThreeCtrl.$inject = [];

	function StepThreeCtrl() {
		var ctrl = this;

		////////////////

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
