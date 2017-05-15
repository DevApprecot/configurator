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
		ctrl.selectedItem = {};
		ctrl.gotColors = false;

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
				.then(() => { ctrl.gotColors = true });
		}

		ctrl.toggleSelect = function(color) {

			(ctrl.selectedItem.OptionCode == color.OptionCode) ? ctrl.selectedItem = {}: ctrl.selectedItem = color;

			ctrl.onSelect({ colorOptions: ctrl.selectedItem, isNextSelected: false })

		}

		ctrl.isSelected = function(code) {
			return ctrl.selectedItem.OptionCode == code;
		}
	}
})();
