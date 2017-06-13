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

	AppHeaderCtrl.$inject = ['$state', '$stateParams', 'Data', 'Modals'];

	function AppHeaderCtrl($state, $stateParams, Data, Modals) {
		var ctrl = this;

		ctrl.stateIs = function(stateName) {
			return stateName == $state.current.name
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};

		ctrl.back = () => {
			let modalInstance = Modals.confirm();

			modalInstance.result.then(() => {
				console.log('I accepted');
				ctrl.onBack();
			}, () => {
				console.log('I rejected');
			})
		}
	}
})();
