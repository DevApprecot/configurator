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

	AppHeaderCtrl.$inject = ['$state'];

	function AppHeaderCtrl($state) {
		var ctrl = this;

		ctrl.stateIs = function(stateName) {
			return stateName == $state.current.name
		}

		ctrl.goBack = function() {

			delete ctrl.parent.car.family;
			$state.go('app.select-family');
		}

		ctrl.$onInit = function() {};
		ctrl.$onChanges = function(changesObj) {};
		ctrl.$onDestory = function() {};
	}
})();
