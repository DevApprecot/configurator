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
		ctrl.page = 1;
		ctrl.pageSize = 5;

		ctrl.$onInit = function() {
			ctrl.getModels(ctrl.page);
		};

		ctrl.$onChanges = function(changesObj) {
			console.log('selected Items changed');
			console.log(changesObj);
		};

		ctrl.$onDestory = function() {};

		ctrl.getModels = function(page) {

			console.log(page);

			API.models($stateParams.familyId, page, ctrl.pageSize)
				.then(resp => {

					console.log(resp);

					ctrl.models = resp.data.map(val => {
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
