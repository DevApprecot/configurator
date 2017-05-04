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

	StepTwoCtrl.$inject = ['$stateParams', 'API', 'Data'];

	function StepTwoCtrl($stateParams, API, Data) {
		var ctrl = this;
		

		ctrl.$onInit = function() {
			ctrl.getColors();
		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		ctrl.getColors = function getColors() {
			API.colors($stateParams.modelId)
				.then(resp => {
					console.log(resp);
					ctrl.colors = resp.data.listOfData.map(val => {
						if (!val.Photo)
							val.Photo = Data.get.model()
							.Photo;

						return val;
					});

				}, resp => {
					console.log('Failed to get colors', resp);
				})
		}
	}
})();
