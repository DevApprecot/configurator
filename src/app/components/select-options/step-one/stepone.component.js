(function() {
	'use strict';

	angular
		.module('configurator')
		.component('stepOne', {
			templateUrl: './app/components/select-options/step-one/stepone.html',
			controller: StepOneCtrl,
			bindings: {},
		});

	StepOneCtrl.$inject = ['API', 'DEFAULT_CAR_IMAGE'];

	function StepOneCtrl(API, DEFAULT_CAR_IMAGE) {
		var ctrl = this;
		var _families = [];
		ctrl.models = [];
		ctrl.default = DEFAULT_CAR_IMAGE;

		ctrl.$onInit = function() {
			API.models()
				.then(resp => {

					var temp = resp.data.filter(item => item.Family === 'TRANSPORTER T5');
					for (var i = 0; i < temp.length; i++) {

						if (!_families.map(item => item.code)
							.includes(temp[i].Family)) {
							_families.push({
								code: temp[i].Family,
								name: temp[i].ParentModelDescription
							})
						}

					}

					ctrl.family = _families[0];

					ctrl.models = resp.data.filter(item => item.Family === 'TRANSPORTER T5');
					console.log(ctrl.models);
				}, resp => {
					console.log('Failed to get moels', resp);
				})
		};
		ctrl.$onChanges = function(changesObj) {
			console.log(changesObj);
		};
		ctrl.$onDestory = function() {};
	}
})();
