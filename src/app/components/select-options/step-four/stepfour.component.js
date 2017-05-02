(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepFour', {
			templateUrl: './app/components/select-options/step-four/stepfour.html',
			controller: StepFourCtrl,
			bindings: {
				imgPath: "@",
				defaultImg: "@"
			},
		});

	StepFourCtrl.$inject = ['Data'];

	function StepFourCtrl(Data) {
		var ctrl = this;

		ctrl.$onInit = function() {

			Object.keys(Data.get)
				.map(val => {
					ctrl[val] = Data.get[val]()
				})

			console.log(ctrl);

		};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
