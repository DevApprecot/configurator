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

	AppHeaderCtrl$inject = ['$state'];

	function AppHeaderCtrl($state) {
		var ctrl = this;

		ctrl.stateIs = function(stateName) {
			return stateName == $state.current.name
		}

		ctrl.goBack = function() {
			const currentState = $state.current.name;

			if (currentState == 'app.select-model') {
				delete ctrl.parent.car.model;
				delete ctrl.parent.car.family;
				$state.go('app.select-family');
			} else if (currentState == 'app.select-options') {
				delete ctrl.parent.car.model;
				$state.go('app.select-model', { familyId: ctrl.parent.car.family.id });
			}
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
