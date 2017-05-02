(function() {
	'use strict';

	angular
		.module('configurator')
		.component('appHeader', {
			templateUrl: './app/components/app-header/appheader.html',
			controller: AppHeaderCtrl,
			bindings: {
				theme: '@',
				price: '@',
				familyName: '@',
				modelName: '@',
				onBack: '&'
			}
		});

	AppHeaderCtrl.$inject = ['$state', '$stateParams', 'Data'];

	function AppHeaderCtrl($state, $stateParams, Data) {
		var ctrl = this;

		ctrl.stateIs = function(stateName) {
			return stateName == $state.current.name
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {
			console.log(changesObj);
		};
		ctrl.$onDestory = function() {};
	}
})();
