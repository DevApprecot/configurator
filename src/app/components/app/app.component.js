(function() {
	'use strict';

	angular
		.module('configurator')
		.component('app', {
			templateUrl: './app/components/app/app.html',
			controller: AppCtrl,
			bindings: {
				theme: '@'
			},
		});

	AppCtrl.$inject = ['Data'];

	function AppCtrl(Data) {
		var ctrl = this;

		//This is the car object which will be sent on service
		ctrl.car = {
			family: Data.get.family() || null
		};

		ctrl.$onInit = function() {};

		ctrl.$onChanges = function(changesObj) {
			console.log('app changes', changesObj);
		};

		ctrl.$onDestory = function() {};

	}
})();
