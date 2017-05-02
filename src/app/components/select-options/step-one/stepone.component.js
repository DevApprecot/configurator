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

	StepOneCtrl.$inject = ['API', 'Data'];

	function StepOneCtrl(API, Data) {
		var ctrl = this;
		ctrl.models = [];

		ctrl.$onInit = function() {
			API.models()
				.then(resp => {

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
