(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepTwo', {
			templateUrl: './app/components/select-options/step-two/steptwo.html',
			controller: StepTwoCtrl,
			bindings: {
				onSelect: "&",
				imgPath: "@",
				defaultImg: "@"
			}
		});

	StepTwoCtrl.$inject = ['API', 'Data'];

	function StepTwoCtrl(API, Data) {
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
					ctrl.colors = resp.data.map(val => {
						if (!val.Photo)
							val.Photo = Data.get.model()
							.Photo;

						return val;
					});;
				}, resp => {
					console.log('Failed to get colors', resp);
				})
		}
	}
})();
