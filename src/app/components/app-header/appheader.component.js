(function() {
	'use strict';

	angular
		.module('configurator')
		.component('appHeader', {
			templateUrl: './app/components/app-header/appheader.html',
			controller: AppHeaderCtrl,
			require: {
				parent: '^app'
			}
		});

	AppHeaderCtrl.$inject = ['$state', '$stateParams', 'Data'];

	function AppHeaderCtrl($state, $stateParams, Data) {
		var ctrl = this;

		ctrl.stateIs = function(stateName) {
			return stateName == $state.current.name
		}

		ctrl.goBack = function() {
			delete ctrl.parent.car.family;
			Data.clear.options();
			$state.go('app.select-family', { makeId: $stateParams.makeId });
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
