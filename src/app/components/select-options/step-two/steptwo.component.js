(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepTwo', {
			templateUrl: './app/components/select-options/step-two/steptwo.html',
			controller: StepTwoCtrl,
			bindings: {},
		});

	StepTwoCtrl.$inject = [];

	function StepTwoCtrl() {
		var ctrl = this;


		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
