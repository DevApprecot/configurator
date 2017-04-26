(function() {
	'use strict';

	angular
		.module('configurator')
		.component('steps', {
			templateUrl: './app/components/select-options/steps/steps.html',
			controller: StepsCtrl,
			bindings: {},
		});

	StepsCtrl.$inject = [];

	function StepsCtrl() {
		var ctrl = this;

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
