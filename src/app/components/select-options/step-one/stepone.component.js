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
			API.models(2, $stateParams.familyId)
				.then(resp => {

					console.log(resp.data.filter(val=>val.Code=='8XFAS4'));

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
		};

		ctrl.$onChanges = function(changesObj) {
			console.log('selected Items changed');
			console.log(changesObj);
		};

		ctrl.$onDestory = function() {};

	}

})();
