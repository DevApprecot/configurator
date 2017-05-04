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


		ctrl.$onInit = function() {
			ctrl.getModels();
		};

		ctrl.$onChanges = function(changesObj) {
			console.log('selected Items changed');
			console.log(changesObj);
		};

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
		}

	}

})();
