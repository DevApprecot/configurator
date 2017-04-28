(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepTwo', {
			templateUrl: './app/components/select-options/step-two/steptwo.html',
			controller: StepTwoCtrl,
			bindings: {
				onSelect: "&"
			}
		});

	StepTwoCtrl.$inject = ['API'];

	function StepTwoCtrl(API) {
		var ctrl = this;

		var _getColors = getColors;

		ctrl.$onInit = function() {
			_getColors();
		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		function getColors() {
			API.colors()
				.then(resp => {
					console.log(resp);
				}, resp => {
					console.log('Failed to get colors', resp);
				})
		}
	}
})();
