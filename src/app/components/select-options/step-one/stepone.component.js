(function() {
	'use strict';

	angular
		.module('configurator')

		.component('stepOne', {
			templateUrl: './app/components/select-options/step-one/stepone.html',
			controller: StepOneCtrl,
			bindings: {
				onSelect: '&',
				imgPath: '@',
				defaultImg: '@'
			}
		});

	StepOneCtrl.$inject = ['$stateParams', 'API', 'Data'];

	function StepOneCtrl($stateParams, API, Data) {
		var ctrl = this;
		ctrl.models = [];
		ctrl.selectedItem = Data.get.model() || {};
		ctrl.gotModels = false;

		ctrl.$onInit = function() {
			ctrl.getModels();
		};

		ctrl.$onChanges = function(changesObj) {};

		ctrl.$onDestory = function() {};

		ctrl.getModels = function(page) {

			API.models($stateParams.familyId)
				.then(resp => {

					console.log(resp);

					ctrl.models = resp.data.listOfData.map(val => {
						if (!val.Photo)
							val.Photo = Data.get.family()
							.Photo;

						return val;
					});

					console.log(ctrl.models);
				}, resp => {
					console.log('Failed to get moels', resp);
				})
				.then(() => { ctrl.gotModels = true; })
		}

		ctrl.toggleSelect = (model) => {

			(ctrl.selectedItem.Code == model.Code) ? ctrl.selectedItem = {}: ctrl.selectedItem = model;
			ctrl.onSelect({ model: ctrl.selectedItem });

		}

		ctrl.isSelected = (code) => {
			return ctrl.selectedItem.Code == code;
		}

	}

})();
